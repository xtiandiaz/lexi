<script setup lang="ts">
import "@/assets/tungsten/extensions/array.extensions"
import { ref, onMounted, onBeforeUnmount } from 'vue'
import router from '@/router'
import { type InputSource, InputMarkKind, UserInput } from '@/models/input'
import { InputTool } from '@/models/tools'
import { Section } from '@/models/navigation'
import { GameMode } from '@/models/game'
import sessionStore from '@/stores/session'
import settingsStore from '@/stores/settings'
import { produceInputWithTool } from '@/services/tool-handler'
import { resetSessionIfNeeded } from "@/services/session-management"
import { saveWordInDailyHistory, resetDailyHistoryIfNeeded } from '@/services/history-management'
import { computedNavigationBarVM } from "@/view-models/vm-navigation"
import InputScreen from '@/components/game/InputScreen.vue'
import InputGamepad from '@/components/game/InputGamepad.vue'
import NavigationBar from '@vueties/bars/NavigationBar.vue'

const session = sessionStore()
const settings = settingsStore()

const inputSource = ref<InputSource>()
const userInput = ref<UserInput>()

const navigationBarVM = computedNavigationBarVM(Section.Game)

function restoreInputOrResume() {
  switch (session.gameMode) {
    case GameMode.Exploration:
      if (session.input?.source.language === settings.currentLanguage) {
        inputSource.value = session.input.source
        userInput.value = new UserInput(session.input.source, session.input.indices)
        
        resetDailyHistoryIfNeeded()
      } else {
        resume()
      }
      break
    default:
      resume()
  }
}

function resume() {
  const nextTerm = session.content?.nextTerm
  if (!nextTerm) {
    console.warn(`No more terms available at source: ${session.content?.source}`)
    
    if (session.gameMode === GameMode.Review) {
      finishReview()
    }
    return
  }
  
  inputSource.value = {
    language: settings.currentLanguage,
    term: nextTerm
  }
  
  userInput.value = new UserInput(inputSource.value)
  
  resetDailyHistoryIfNeeded()
}

function finishReview() {
  router.push(Section.DailyHistory)
}

function onInput(index: number) {
  if (!userInput.value) {
    return
  }
  
  if (index >= 0) {
    userInput.value.indices.push(index)
    
    if (userInput.value.isComplete) {
      if (session.gameMode === GameMode.Review) {
        userInput.value.addMark(InputMarkKind.Test, 1)
        userInput.value.resetMark(InputMarkKind.Hint)
      }
      saveWordInDailyHistory(userInput.value)
    }
  } else {
    userInput.value.indices.pop()
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

onMounted(async () => {
  resetDailyHistoryIfNeeded()
  
  await resetSessionIfNeeded()
  
  restoreInputOrResume()
})

onBeforeUnmount(() => {
  session.input = userInput.value
  session.gameMode = GameMode.Exploration
})
</script>

<template>
  <span id="spinner" v-if="!inputSource"></span>
  
  <NavigationBar v-if="session.gameMode === GameMode.Exploration" :vm="navigationBarVM" />
  
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
</style>
