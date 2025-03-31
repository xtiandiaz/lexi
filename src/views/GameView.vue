<script setup lang="ts">
import "@/assets/tungsten/extensions/array.extensions"
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from "vue-router"
import { type InputSource, type InputState, InputMarkKind, UserInput } from '@/models/input'
import { InputTool } from '@/models/tools'
import { Section } from '@/models/navigation'
import { GameMode, type Test } from '@/models/game'
import { type Term } from '@/models/content'
import sessionStore from '@/stores/session'
import settingsStore from '@/stores/settings'
import { produceInputWithTool } from '@/services/tool-handler'
import { resetSessionIfNeeded, saveSession } from "@/services/session-management"
import { saveWordInDailyHistory, resetDailyHistoryIfNeeded } from '@/services/history-management'
import { onWindowEvent } from '@/composables/window-event'
import { computedNavigationBarVM } from "@/view-models/vm-navigation"
import NavigationBar from '@vueties/bars/NavigationBar.vue'
import InputScreen from '@/components/InputScreen.vue'
import InputGamepad from '@/components/InputGamepad.vue'
import TestStatusBar from "@/components/TestStatusBar.vue"

const router = useRouter()

const session = sessionStore()
const settings = settingsStore()

const inputSource = ref<InputSource>()
const userInput = ref<UserInput>()

const navigationBarVM = computedNavigationBarVM(Section.Game)
const testBackgroundOpacity = computed(() => session.gameMode === GameMode.Test && userInput.value?.isComplete ? 5 : 0)

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
  
  const newTerm = session.content?.produceNewTerm()
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
    router.push(Section.DailyHistory)
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

function onPageUnfocusedOrUnmounted() {
  console.log("Game View unfocused or unmounted...")
  
  if (userInput.value?.mode === GameMode.Exploration) {
    saveSession(userInput.value as InputState)
  }
}

onMounted(async () => {
  resetDailyHistoryIfNeeded()
  
  await resetSessionIfNeeded()
  
  restoreInputOrResume()
})

onBeforeUnmount(() => {
  onPageUnfocusedOrUnmounted()
})

onWindowEvent('blur', onPageUnfocusedOrUnmounted)
onWindowEvent('beforeunload', onPageUnfocusedOrUnmounted)
onWindowEvent('pagehide', onPageUnfocusedOrUnmounted) // for iOS
</script>

<template>
  <div class="test-background" :style="{ opacity: `${testBackgroundOpacity}%` }"></div>
  
  <span id="spinner" v-if="!inputSource"></span>
  
  <NavigationBar v-if="session.gameMode === GameMode.Exploration" :vm="navigationBarVM" />
  
  <TestStatusBar v-if="session.gameMode === GameMode.Test" />
  
  <main class="game" v-if="userInput">
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
@use '@vueties/styles/utils';
@use '@design-tokens/palette';

.test-background {
  @extend .background;
  opacity: 0;
  transition: opacity 0.5s linear;
  @include palette.color-attribute('background-color', 'green');
}
</style>
