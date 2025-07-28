<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { type InputState, InputMarkKind, UserInput } from '@/models/input'
import { ToolKey } from '@/models/tools'
import { GameMode, type Test } from '@/models/game'
import { type Term } from '@/models/content'
import useGameStore from '@/stores/game'
import { produceInputWithTool } from '@/services/tool-handler'
import { resetSessionIfNeeded, storeAndSaveSessionIfNeeded } from "@/services/session-management"
import { saveWordInDailyHistory, resetDailyHistoryIfNeeded } from '@/services/history-management'
import InputScreen from '@/components/InputScreen.vue'
import InputGamepad from '@/components/InputGamepad.vue'
import TestStatusBar from "@/components/TestStatusBar.vue"
import { setUpEvent } from '@vueties/composables/set-up-event'
import VuetyProgressIndicator from "@vueties/components/misc/VuetyProgressIndicator.vue"
import "@/assets/tungsten/extensions/array.extensions"

const store = useGameStore()

const term = ref<Term>()
const userInput = ref<UserInput>()

const isTermPass = computed(() => store.mode === GameMode.Test && userInput.value?.isComplete)

async function reset() {
  term.value = undefined
  userInput.value = undefined
  
  resetDailyHistoryIfNeeded()
  
  await resetSessionIfNeeded()
  
  restoreInputOrResume()
}

function restoreInputOrResume() {
  if (
    store.mode === GameMode.Exploration && 
    store.inputState && 
    store.settings.activeLanguages.includes(store.inputState.term.language)
  ) {
    term.value = store.inputState.term
    userInput.value = new UserInput(store.inputState.term, GameMode.Exploration, store.inputState.indices)
    return
  }
  
  resume()
}

function resume() {
  const test = store.test
  if (test) {
    resumeTest(test)
    return
  }
  
  const newTerm = store.content?.produceNextTerm()
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
    store.test = undefined
    return
  }
  
  resumeWithTerm(nextTerm, GameMode.Test)
}

function resumeWithTerm(_term: Term, mode: GameMode) {
  term.value = _term
  userInput.value = new UserInput(term.value, mode)
  
  if (mode === GameMode.Exploration) {
    store.inputState = userInput.value
  }
}

function cancelTest() {
  store.test = undefined
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
  
  if (store.test) {
    userInput.value.addMark(InputMarkKind.Test, 1)
    userInput.value.resetMark(InputMarkKind.Hint)
    
    store.test.makeProgressWithTerm(userInput.value.term)
  } else {
    storeAndSaveSessionIfNeeded(userInput.value)
  }
  
  saveWordInDailyHistory(userInput.value)
}

function setTool(tool: ToolKey) { 
  switch(tool) {
    case ToolKey.Hint:
      if (!userInput.value) {
        return
      }
      
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

watch(() => [store.settings.activeLanguages, store.mode], async () => {
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
    v-if="store.mode === GameMode.Test" 
    @intended-to-cancel="cancelTest"
  />
  
  <main v-if="userInput">
    <InputScreen :state="userInput" />
    
    <InputGamepad 
      :state="userInput"
      @input="onInput"
      @setTool="setTool" 
      @continued="resume()"
    />
  </main>
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;
@use '@vueties/components/bars/styles' as bar-styles;

@include vs.fade(0.5s);

main {
  height: 100%;
  z-index: 1;
}

section {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1em;
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
  @include vs.size(3em);
  @include vs.position(absolute, 0, 0, 0, 0);
}

#test-pass-background {
  z-index: 0;
  @include vs.position(fixed, 0, 0, 0, 0);
  @include vs.linear-gradient(180deg, 'green' 0.15 0%, 'green' 0 75%);
}
</style>
