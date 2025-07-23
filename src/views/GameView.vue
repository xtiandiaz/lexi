<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { type InputState, InputMarkKind, UserInput } from '@/models/input'
import { InputTool } from '@/models/tools'
import { GameMode, type Test } from '@/models/game'
import { type Term } from '@/models/content'
import sessionStore from '@/stores/session'
import settingsStore from '@/stores/settings'
import { produceInputWithTool } from '@/services/tool-handler'
import { resetSessionIfNeeded, storeAndSaveSessionIfNeeded } from "@/services/session-management"
import { saveWordInDailyHistory, resetDailyHistoryIfNeeded } from '@/services/history-management'
import InputScreen from '@/components/InputScreen.vue'
import InputGamepad from '@/components/InputGamepad.vue'
import TestStatusBar from "@/components/TestStatusBar.vue"
import { setUpEvent } from '@vueties/composables/set-up-event'
import VuetyProgressIndicator from "@vueties/components/misc/VuetyProgressIndicator.vue"
import "@/assets/tungsten/extensions/array.extensions"

const session = sessionStore()
const settings = settingsStore()

const term = ref<Term>()
const userInput = ref<UserInput>()

const isTermPass = computed(() => session.gameMode === GameMode.Test && userInput.value?.isComplete)

async function reset() {
  term.value = undefined
  userInput.value = undefined
  
  resetDailyHistoryIfNeeded()
  
  await resetSessionIfNeeded()
  
  restoreInputOrResume()
}

function restoreInputOrResume() {
  if (
    session.gameMode === GameMode.Exploration && 
    session.inputState && 
    settings.activeLanguages.includes(session.inputState.term.language)
  ) {
    term.value = session.inputState.term
    userInput.value = new UserInput(session.inputState.term, GameMode.Exploration, session.inputState.indices)
    return
  }
  
  resume()
}

function resume() {
  const test = session.test
  if (test) {
    resumeTest(test)
    return
  }
  
  const newTerm = session.content?.produceNextTerm()
  if (!newTerm) {
    console.error(`No content available!`)
    return
  }
  
  resumeWithTerm(newTerm, GameMode.Exploration)
  
  resetDailyHistoryIfNeeded()
}

function resumeTest(test: Test) {
  const nextTerm = test.produceNextTerm()
  if (!nextTerm) {
    session.test = undefined
    return
  }
  
  resumeWithTerm(nextTerm, GameMode.Test)
}

function resumeWithTerm(_term: Term, mode: GameMode) {
  term.value = _term
  userInput.value = new UserInput(term.value, mode)
  
  if (mode === GameMode.Exploration) {
    session.inputState = userInput.value
  }
}

function cancelTest() {
  session.test = undefined
}

function onInput(index: number) {
  if (!userInput.value) {
    return
  }
  
  if (index < 0) {
    userInput.value.indices.pop()
    return
  }
  
  userInput.value.indices.push(index)
  
  if (userInput.value.isComplete) {
    onInputCompleted()
  }
}

function onInputCompleted() {
  if (!userInput.value || !userInput.value.isComplete) {
    return
  }
  
  if (session.test) {
    userInput.value.addMark(InputMarkKind.Test, 1)
    userInput.value.resetMark(InputMarkKind.Hint)
    
    session.test.makeProgressWithTerm(userInput.value.term)
  } else {
    storeAndSaveSessionIfNeeded(userInput.value)
  }
  
  saveWordInDailyHistory(userInput.value)
}

function onInputToolSelected(tool: InputTool) {
  if (!userInput.value) {
    return
  }
  
  switch(tool) {
    case InputTool.Hint:
      const newInputIndices = produceInputWithTool(tool, userInput.value)
      
      if (newInputIndices) {
        userInput.value.indices = newInputIndices
        userInput.value.addMark(InputMarkKind.Hint, 1)
      }
      break
  }
}

function onPageUnfocusedOrUnmounted() {
  console.log("Game View unfocused or unmounted...")
  
  if (userInput.value?.mode === GameMode.Exploration) {
    storeAndSaveSessionIfNeeded(userInput.value as InputState)
  }
}

watch(() => [settings.activeLanguages, session.gameMode], async () => {
  await reset()
}, { deep: true })

onMounted(async () => {
  await reset()
})

onBeforeUnmount(() => {
  onPageUnfocusedOrUnmounted()
})

setUpEvent('blur', window, onPageUnfocusedOrUnmounted)
setUpEvent('beforeunload', window, onPageUnfocusedOrUnmounted)
setUpEvent('pagehide', window, onPageUnfocusedOrUnmounted) // for iOS
</script>

<template>
  <Transition name="fade">
    <div v-if='isTermPass' id="test-pass-background"></div>
  </Transition>
  
  <VuetyProgressIndicator v-if="!term" class="absolutely-centered-block" />
  
  <TestStatusBar 
    v-if="session.gameMode === GameMode.Test" 
    @intended-to-cancel="cancelTest"
  />
  
  <main v-if="userInput">
    <InputScreen :state="userInput" />
    
    <InputGamepad 
      :state="userInput"
      @input="onInput"
      @input-tool-selected="onInputToolSelected" 
      @continued="resume()"
    />
  </main>
</template>

<style scoped lang="scss">
@use '@vueties/components/bars/styles' as bar-styles;
@use '@vueties/styles/mixins';
@use '@vueties/styles/transitions';
@use '@design-tokens/palette';

@include transitions.fade(0.5s);

main {
  height: 100%;
  z-index: 1;
}

section {
  $h-padding: 1em;
  $v-padding: 1em;
  
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: $v-padding $h-padding;
  text-align: center;
  width: 100%;
  
  &#screen {
    height: 45%;
    gap: 0.25em;
    
    h1 {
      margin-bottom: 0.25em;
    }
    
    h6 {
      margin: 0;
    }
  }
  
  &#gamepad {
    height: 55%;
  }
}

.vuety-progress-indicator {
  margin: auto;
  @include mixins.size(3em);
  @include mixins.position(absolute, 0, 0, 0, 0);
}

#test-pass-background {
  z-index: 0;
  @include mixins.position(fixed, 0, 0, 0, 0);
  @include mixins.linear-gradient(180deg, 'green' 0.15 0%, 'green' 0 75%);
}
</style>
