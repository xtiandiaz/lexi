<script setup lang="ts">
import '@/assets/tungsten/extensions/array.extensions'
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import WordScreen from '@/components/game/WordScreen.vue'
import WordGamepad from '@/components/game/WordGamepad.vue'
import NavBar from '@/components/NavBar.vue'
import { wordTool, ToolKey, type ITool } from '@/models/tools'
import { SectionKey, navigationMap } from '@/models/navigation'
import { inGameStore, type IActiveWordState } from '@/stores/in-game'
import { openWordToolPage } from '@/services/external-content-launching'
import { loadContent } from '@/services/word-provision'
import { canHint, getHintedChunk } from '@/services/word-analysis'
import { saveDailyWord, resetDailyHistoryIfNeeded } from '@/services/history-management'
import { shuffle } from '@/assets/tungsten/randomness'
import { clamp } from '@/assets/tungsten/math'

const inGame = inGameStore()

// type GamepadType = InstanceType<typeof WordGamepad>
// const gamepadRef = useTemplateRef<GamepadType>('gamepad');

const activeWord = ref<string>()
// const activeWordSynonyms = ref<string[]>()
const activeHintPrefix = ref<string>()
const activeInputableIndices = ref<number[]>([])
const activeInputIndices = ref<number[]>([])
const activeTools = ref<Map<ToolKey, ITool>>(new Map())

const inputableActiveWordHunk = computed(() => activeWord.value?.substring(activeHintPrefix.value!.length))
const activeInputString = computed(() => activeInputIndices.value.map(i => activeWord.value![i]).join(''))
const hintPrefixedActiveInputString = computed(() => activeHintPrefix.value + activeInputString.value)
const isActiveWordCompleted = computed(() => hintPrefixedActiveInputString.value === activeWord.value)

function resetActiveWord(activeWordState?: IActiveWordState) {
  if (activeWordState !== undefined) {
    activeWord.value = activeWordState.word
    activeHintPrefix.value = activeWordState.hintPrefix
    activeInputIndices.value = activeWordState.input
    activeInputableIndices.value = activeWordState.inputable
  } else {
    const newWordItem = inGame.resetActiveWordItem()
    const linkedWords = newWordItem.split(',')
    
    activeWord.value = linkedWords[0]
    // activeWordSynonyms.value = linkedWords.splice(1)
    
    const inputableStartIndex = clamp(Math.floor(activeWord.value.length * 0.25), 0, Math.floor(activeWord.value.length / 2))
    activeHintPrefix.value = activeWord.value.substring(0, inputableStartIndex)
    activeInputableIndices.value = shuffle(Array.range(inputableStartIndex, activeWord.value.length, 1))
    
    activeInputIndices.value = []
  }
  
  activeTools.value = new Map([ToolKey.Hint].map(key => [key, wordTool(key, true)]))
  
  resetDailyHistoryIfNeeded()
}

// function onInputChanged(letterIndices: number[]) {
//   activeInput.value = letterIndices
function onInput(index: number) {
  console.log(index)
  
  if (index >= 0) {
    activeInputIndices.value.push(index)
    
    if (isActiveWordCompleted.value) {
      saveDailyWord(activeWord.value!)
    }
  } else {
    activeInputIndices.value.pop()
  }
}

function onToolSelected(tool: ToolKey) {
  if (activeWord.value === undefined)
    return

  switch (tool) {
    case ToolKey.Define:
    case ToolKey.WikipediaSearch:
    case ToolKey.WebSearch:
    case ToolKey.ImageSearch:
      openWordToolPage(tool, activeWord.value)
      break
    case ToolKey.Continue:
      resetActiveWord()
      break
    case ToolKey.Hint:
      const hintedChunk = getHintedChunk(activeInputString.value, inputableActiveWordHunk.value!)
      // console.log('hintedChunk', hintedChunk)
      if (hintedChunk !== undefined) {
        const inputableStartIndex = activeHintPrefix.value!.length
        const hintedChunkIndices = Array.range(inputableStartIndex, inputableStartIndex + hintedChunk.length, 1)
        // gamepadRef.value?.replaceInputIndices(hintedChunkIndices)
        activeInputIndices.value = hintedChunkIndices
      }
      updateToolState(ToolKey.Hint)
      break
  }
}

function updateToolState(key: ToolKey) {
  const tool = activeTools.value?.get(key)
  if (tool === undefined)
    return
  
  switch (key) {
    case ToolKey.Hint:
      tool.isEnabled = canHint(activeInputString.value, inputableActiveWordHunk.value!)
      break
  }
  
  activeTools.value.set(key, tool)
}

watch(
  activeInputIndices, 
  () => {
    if (isActiveWordCompleted.value) {    
      activeTools.value = new Map(
        [
          ToolKey.Define, 
          ToolKey.WikipediaSearch, 
          ToolKey.WebSearch, 
          ToolKey.ImageSearch, 
          ToolKey.Continue
        ].map(key => [key, wordTool(key, true)])
      )
    }
    
    updateToolState(ToolKey.Hint)
  },
  { deep: true }
)

onMounted(async () => {
  await loadContent()
  
  resetActiveWord(inGame.activeWordState)
})

onBeforeUnmount(() => {
  inGame.activeWordState = {
    inputable: activeInputableIndices.value,
    input: activeInputIndices.value,
    hintPrefix: activeHintPrefix.value!,
    word: activeWord.value!
  }
})
</script>

<template>
  <span id="spinner" v-if="activeWord === undefined"></span>
  <NavBar :map="navigationMap(SectionKey.Game)" />
  <main class="game" v-if="activeWord !== undefined">
    <WordScreen 
      :input="activeHintPrefix + activeInputString"
      :is-word-completed="isActiveWordCompleted"
    />
    <WordGamepad 
      ref="gamepad"
      :word="activeWord!" 
      :inputable-letter-indices="activeInputableIndices"
      :input-letter-indices="activeInputIndices"
      :tools="Array.from(activeTools.values())"
      @reset-active-word="resetActiveWord" 
      @tool-selected="onToolSelected" 
      @input="onInput"
    />
  </main>
</template>
