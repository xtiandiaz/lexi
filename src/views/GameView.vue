<script setup lang="ts">
import "@/assets/tungsten/extensions/array.extensions"
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { type InputSource, type InputState, InputMarkKind, UserInput } from '@/models/input'
import { InputTool } from '@/models/tools'
import { GameMode, type Test } from '@/models/game'
import { type Term } from '@/models/content'
import sessionStore from '@/stores/session'
import settingsStore from '@/stores/settings'
import { produceInputWithTool } from '@/services/tool-handler'
import { resetSessionIfNeeded, saveSession } from "@/services/session-management"
import { saveWordInDailyHistory, resetDailyHistoryIfNeeded } from '@/services/history-management'
import { onWindowEvent } from '@/vueties/composables/window-event'
import InputScreen from '@/components/InputScreen.vue'
import InputGamepad from '@/components/InputGamepad.vue'
import TestStatusBar from "@/components/TestStatusBar.vue"
import ProgressIndicator from "@vueties/components/misc/VuetyProgressIndicator.vue"

const session = sessionStore()
const settings = settingsStore()

const inputSource = ref<InputSource>()
const userInput = ref<UserInput>()

const isTermPass = computed(() => session.gameMode === GameMode.Test && userInput.value?.isComplete)

async function reset() {
  inputSource.value = undefined
  userInput.value = undefined
  
  resetDailyHistoryIfNeeded()
  
  await resetSessionIfNeeded()
  
  restoreInputOrResume()
}

function restoreInputOrResume() {
  if (session.gameMode === GameMode.Exploration && session.inputState) {
    inputSource.value = session.inputState.source
    userInput.value = new UserInput(session.inputState.source, GameMode.Exploration, session.inputState.indices)
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
  
  const newTerm = session.content?.produceRandomTerm()
  if (!newTerm) {
    console.error(`No content available!`)
    return
  }
  
  resumeWithTerm(newTerm, GameMode.Exploration)
  
  resetDailyHistoryIfNeeded()
}

function resumeTest(test: Test) {
  const nextTerm = test.nextTerm()
  if (!nextTerm) {
    session.test = undefined
    return
  }
  
  resumeWithTerm(nextTerm, GameMode.Test)
}

function resumeWithTerm(term: Term, mode: GameMode) {
  inputSource.value = {
    language: settings.currentLanguage,
    term: term
  }
  userInput.value = new UserInput(inputSource.value, mode)
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
    
    session.test.makeProgressWithTerm(userInput.value.source.term)
  } else {
    saveSession(userInput.value)
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
    saveSession(userInput.value as InputState)
  }
}

watch(async () => [settings.currentLanguage, session.gameMode], async () => {
  await reset()
})

onMounted(async () => {
  await reset()
})

onBeforeUnmount(() => {
  onPageUnfocusedOrUnmounted()
})

onWindowEvent('blur', onPageUnfocusedOrUnmounted)
onWindowEvent('beforeunload', onPageUnfocusedOrUnmounted)
onWindowEvent('pagehide', onPageUnfocusedOrUnmounted) // for iOS
</script>

<template>
  <Transition name="fade">
    <div v-if='isTermPass' id="test-pass-background"></div>
  </Transition>
  
  <ProgressIndicator v-if="!inputSource" class="absolutely-centered-block" />
  
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
@use '@vueties/utils/styles';
@use '@vueties/utils/mixins' as utility-mixins;
@use '@vueties/utils/transitions' as utility-transitions;
@use '@design-tokens/palette';

@include utility-transitions.fade(0.5s);

main {
  z-index: 1;
  
  section {
    $h-padding: 1em;
    $v-padding: 1em;
    
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: $v-padding $h-padding;
    text-align: center;
    width: calc(100% - $h-padding * 2);
    
    &#screen {
      height: calc(45% - $v-padding * 2);
      gap: 0.25em;
      
      h1 {
        margin-bottom: 0.25em;
      }
      
      h6 {
        margin: 0;
      }
    }
    
    &#gamepad {
      height: calc(55% - $v-padding * 2);
    }
  }
}

.progress-indicator {
  width: 3em;
  height: 3em;
}

#test-pass-background {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 0;
  @include utility-mixins.linear-gradient(180deg, 'green' 0.15 0%, 'green' 0 75%);
}
</style>
