<script setup lang="ts">
import '@/assets/tungsten/extensions/array.extensions'
import { ref, computed, onMounted, useTemplateRef } from 'vue'
import WordScreen from '@/components/WordScreen.vue'
import WordGamepad from '@/components/WordGamepad.vue'
import { WordTool } from '@/models/tools'
import { shuffle } from '@/assets/tungsten/randomness'
import { clamp } from '@/assets/tungsten/math'
import { openWordToolPage } from '@/services/external-content-launcher'
import { WordProvider } from '@/services/word-provider'
import { settingsStore } from '@/stores/settings'
import { canHint, getHintedChunk } from '@/services/word-analysis'

const settings = settingsStore()
const wordProvider = new WordProvider(settings.activeLanguage)

type GamepadType = InstanceType<typeof WordGamepad>
const gamepadRef = useTemplateRef<GamepadType>('gamepad');

const activeWord = ref<string>()
const activeWordSynonyms = ref<string[]>()
const hintPrefix = ref<string>()
const inputableLetterIndices = ref<number[]>([])
const activeInput = ref<string>('')
const activeTools = ref<Map<WordTool, boolean>>(new Map())

let inputableStartIndex = 0

const inputableActiveWordHunk = computed(() => activeWord.value?.substring(inputableStartIndex))
const hintPrefixedActiveInput = computed(() => hintPrefix.value + activeInput.value)
const isActiveWordCompleted = computed(() => hintPrefixedActiveInput.value === activeWord.value)


function resetActiveWord() {
  const newWord = wordProvider.getRandomWord()
  const linkedWords = newWord.split(',')
  
  activeWord.value = linkedWords[0]
  activeWordSynonyms.value = linkedWords.splice(1)
  
  inputableStartIndex = clamp(Math.floor(activeWord.value.length * 0.25), 0, Math.floor(activeWord.value.length / 2))
  hintPrefix.value = activeWord.value.substring(0, inputableStartIndex)
  inputableLetterIndices.value = shuffle(Array.range(inputableStartIndex, activeWord.value.length, 1))
  
  activeInput.value = ''
  activeTools.value = new Map([WordTool.Hint].map(tool => [tool, true]))
}

function onInputChanged(letterIndices: number[]) {
  activeInput.value = letterIndices.map(i => activeWord.value![i]).join('')
  
  if (isActiveWordCompleted.value) {
    activeTools.value = new Map(
      [WordTool.Define, WordTool.WebSearch, WordTool.ImageSearch, WordTool.Continue].map(tool => [tool, true])
    )
  }
  
  updateToolState(WordTool.Hint)
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
      const hintedChunk = getHintedChunk(activeInput.value, inputableActiveWordHunk.value!)
      if (hintedChunk !== undefined) {
        const hintedChunkIndices = Array.range(inputableStartIndex, inputableStartIndex + hintedChunk.length, 1)
        gamepadRef.value?.replaceInputIndices(hintedChunkIndices)
        onInputChanged(hintedChunkIndices)
      }
      updateToolState(WordTool.Hint)
      break
  }
}

function updateToolState(tool: WordTool) {
  let state = activeTools.value.get(tool)
  if (state === undefined)
    return
  
  switch (tool) {
    case WordTool.Hint:
      state = canHint(activeInput.value, inputableActiveWordHunk.value!)
      break
  }
  
  activeTools.value.set(tool, state)
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
      :input="hintPrefix + activeInput"
      :is-word-completed="isActiveWordCompleted"
      :synonyms="activeWordSynonyms ?? []" 
    />
    <WordGamepad 
      ref="gamepad"
      :word="activeWord" 
      :inputable-letter-indices="inputableLetterIndices"
      :tools="activeTools"
      @reset-active-word="resetActiveWord" 
      @tool-selected="onToolSelected" 
      @input-changed="onInputChanged"
    />
  </main>
</template>
