<script setup lang="ts">
import "@/assets/tungsten/extensions/array.extensions"
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { type InputSource, type InputState, UserInput } from '@/models/input'
import { InputTool } from '@/models/tools'
import { Section } from '@/models/navigation'
import contentStore from '@/stores/content'
import sessionStore from '@/stores/session'
import { loadContent } from '@/services/word-provision'
import { produceInputWithTool } from '@/services/tool-handler'
import { saveWordInDailyHistory, resetDailyHistoryIfNeeded } from '@/services/history-management'
import { clamp } from '@/assets/tungsten/math'
import { computedNavigationBarVM } from "@/view-models/vm-navigation"
import NavigationBar from '@/components/vueties/bars/NavigationBar.vue'
import InputScreen from '@/components/game/InputScreen.vue'
import InputGamepad from '@/components/game/InputGamepad.vue'

const content = contentStore()
const session = sessionStore()

const inputSource = ref<InputSource>()
const userInput = ref<UserInput>()

const navigationBarVM = computedNavigationBarVM(Section.Game)

function resetInputSource(savedInput?: InputState) {
  if (savedInput) {
    inputSource.value = savedInput.source
    userInput.value = new UserInput(savedInput.source, savedInput.indices)
  } else {
    const newTerm = content.randomTerm()
    const termWords = newTerm.split(',')
    const baseWord = termWords[0]
    const linkedWords = termWords.slice(1)
    
    inputSource.value = {
      baseWord: baseWord,
      hintPrefixLength: clamp(Math.floor(baseWord.length * 0.25), 0, Math.floor(baseWord.length / 2)),
      linkedWords
    }
    userInput.value = new UserInput(inputSource.value)
  }
  
  resetDailyHistoryIfNeeded()
}

function onInput(index: number) {
  if (!userInput.value) {
    return
  }
  
  if (index >= 0) {
    userInput.value.indices.push(index)
    
    if (userInput.value.isComplete) {
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
        userInput.value.hintCount++
      }
      break
  }
}

onMounted(async () => {
  await loadContent()
  
  resetInputSource(session.input)
})

onBeforeUnmount(() => {
  session.input = userInput.value
})
</script>

<template>
  <span id="spinner" v-if="!inputSource"></span>
  
  <NavigationBar :vm="navigationBarVM"/>
  
  <main class="game" v-if="userInput">
    <InputScreen :state="userInput" />
    
    <InputGamepad 
      :state="userInput"
      @input="onInput"
      @input-tool-selected="onInputToolSelected" 
      @continued="resetInputSource()" 
    />
  </main>
</template>
