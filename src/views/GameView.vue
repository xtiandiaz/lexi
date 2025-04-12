<script setup lang="ts">
import "@/assets/tungsten/extensions/array.extensions"
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { type InputSource, type InputState, InputMarkKind, UserInput } from '@/models/input'
import { InputTool } from '@/models/tools'
import { Section, sectionFromHashPath, sectionHashPath } from '@/models/navigation'
import { GameMode, type Test } from '@/models/game'
import { type Term } from '@/models/content'
import sessionStore from '@/stores/session'
import settingsStore from '@/stores/settings'
import { produceInputWithTool } from '@/services/tool-handler'
import { resetSessionIfNeeded, saveSession } from "@/services/session-management"
import { saveWordInDailyHistory, resetDailyHistoryIfNeeded } from '@/services/history-management'
import { onWindowEvent } from '@/composables/window-event'
import { computedNavigationBarVM, sectionTitleFromHashPath, sectionViewFromHashPath } from "@/view-models/vm-navigation"
import InputScreen from '@/components/InputScreen.vue'
import InputGamepad from '@/components/InputGamepad.vue'
import TestStatusBar from "@/components/TestStatusBar.vue"
import NavigationBar from '@vueties/bars/NavigationBar.vue'
import ProgressIndicator from "@vueties/misc/ProgressIndicator.vue"
import ModalView from "@/vueties/views/ModalView.vue"

const session = sessionStore()
const settings = settingsStore()

const inputSource = ref<InputSource>()
const userInput = ref<UserInput>()

const currentHashPath = ref<string>()
const currentModalView = computed(() => currentHashPath.value ? sectionViewFromHashPath(currentHashPath.value) : undefined)
const navigationBarVM = computedNavigationBarVM(Section.Game)

const testBackgroundOpacity = computed(() => session.gameMode === GameMode.Test && userInput.value?.isComplete ? 5 : 0)

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
    currentHashPath.value = sectionHashPath(Section.DailyHistory)
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

function onNavigationTargetSelected(section: Section) {
  currentHashPath.value = sectionHashPath(section)
}

async function onModalViewCloseButtonClicked() {
  const closedSection = sectionFromHashPath(currentHashPath.value!)
  
  currentHashPath.value = undefined
  
  switch (closedSection) {
    case Section.Settings:
      await reset()
      break
    default:
      break
  }
}

function onPageUnfocusedOrUnmounted() {
  console.log("Game View unfocused or unmounted...")
  
  if (userInput.value?.mode === GameMode.Exploration) {
    saveSession(userInput.value as InputState)
  }
}

watch(() => currentHashPath.value, (newValue) => {
  window.location.hash = newValue ?? ''
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
  <div class="test-background" :style="{ opacity: `${testBackgroundOpacity}%` }"></div>
  
  <ProgressIndicator v-if="!inputSource" class="absolutely-centered-block" />
  
  <NavigationBar 
    v-if="session.gameMode === GameMode.Exploration" 
    :vm="navigationBarVM" 
    :custom-target-selected-action="onNavigationTargetSelected"
  />
  
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
  
  <ModalView 
    v-if="currentHashPath"
    :title="sectionTitleFromHashPath(currentHashPath)"
    :custom-close-button-action="onModalViewCloseButtonClicked"
  >
    <component :is="currentModalView" />
  </ModalView>
  
</template>

<style scoped lang="scss">
@use '@vueties/styles/utils';
@use '@design-tokens/palette';

.progress-indicator {
  width: 3em;
  height: 3em;
}

.test-background {
  @extend .absolute-background;
  opacity: 0;
  transition: opacity 0.5s linear;
  @include palette.color-attribute('background-color', 'green');
}
</style>
