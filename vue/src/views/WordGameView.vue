<script setup lang="ts">
import '@/assets/tungsten/extensions/array.extensions'
import { ref, computed, onMounted } from 'vue'
import WordScreen from '@/components/WordScreen.vue'
import WordGamepad from '@/components/WordGamepad.vue'
import { WordTool } from '@/models/tools'
import { shuffle } from '@/assets/tungsten/randomness'
import { clamp } from '@/assets/tungsten/math'
import { openWordToolPage } from '@/services/external-content-launcher'
import { WordProvider } from '@/services/word-provider'
import { settingsStore } from '@/stores/settings'

const settings = settingsStore()
const wordProvider = new WordProvider(settings.activeLanguage)

const activeWord = ref<string>()
const activeWordSynonyms = ref<string[]>()
const hintPrefix = ref<string>()
const inputableLetterIndices = ref<number[]>([])
const activeInput = ref<string>('')
const activeTools = ref<WordTool[]>([])

const isActiveWordCompleted = computed(() => activeInput.value === activeWord.value)

function resetActiveWord() {
  const newWord = wordProvider.getRandomWord()
  const linkedWords = newWord.split(',')
  
  activeWord.value = linkedWords[0]
  activeWordSynonyms.value = linkedWords.splice(1)
  
  const INPUTABLE_START_INDEX = clamp(Math.floor(activeWord.value.length * 0.25), 0, Math.floor(activeWord.value.length / 2))
  hintPrefix.value = activeWord.value.substring(0, INPUTABLE_START_INDEX)
  inputableLetterIndices.value = shuffle(Array.range(INPUTABLE_START_INDEX, activeWord.value.length, 1))
  
  activeInput.value = hintPrefix.value
  activeTools.value = [WordTool.Hint, WordTool.Skip]
}

function onInputChanged(letterIndices: number[]) {
  activeInput.value = hintPrefix.value + letterIndices.map(i => activeWord.value![i]).join('')
  
  if (isActiveWordCompleted.value) {
    activeTools.value = [WordTool.Define, WordTool.WebSearch, WordTool.ImageSearch, WordTool.Continue]
  }
}

function onToolSelected(tool: WordTool) {
  
  if (activeWord.value === undefined)
  return

switch (tool) {
  case WordTool.Define:
  case WordTool.WebSearch:
  case WordTool.ImageSearch:
    openWordToolPage(tool, activeWord.value)
    break
  case WordTool.Skip:
  case WordTool.Continue:
    resetActiveWord()
    break
  case WordTool.Hint:
    break
  }
}

onMounted(async () => {
  await wordProvider.load()
  resetActiveWord()
})
</script>

<template>
  <span id="spinner" v-if="activeWord === undefined"></span>
  <main v-if="activeWord !== undefined">
    <WordScreen 
      :input="activeInput"
      :is-word-completed="isActiveWordCompleted"
      :synonyms="activeWordSynonyms ?? []" 
    />
    <WordGamepad 
      :word="activeWord" 
      :inputable-letter-indices="inputableLetterIndices"
      :tools="activeTools"
      @reset-active-word="resetActiveWord" 
      @tool-selected="onToolSelected" 
      @input-changed="onInputChanged"
    />
  </main>
</template>
