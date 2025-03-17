<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import WordScreen from '@/components/game/WordScreen.vue'
import WordGamepad from '@/components/game/WordGamepad.vue'
import { WordToolKey } from '@/models/tools'
import { SectionKey, computedNavigationItems } from '@/models/navigation'
import { inGameStore, type IActiveWordState } from '@/stores/in-game'
import { openWordToolPage } from '@/services/external-content-launching'
import { loadContent } from '@/services/word-provision'
import { fixOrExtendInput } from '@/services/word-utils'
import { saveDailyWord, resetDailyHistoryIfNeeded } from '@/services/history-management'
import { clamp } from '@/assets/tungsten/math'
import NavigationBar from '@/components/vueties/bars/NavigationBar.vue'

const navigationItems = computedNavigationItems(SectionKey.Game)
const inGame = inGameStore()

const activeWord = ref<string>()
// const activeWordSynonyms = ref<string[]>()
const activeHintPrefix = ref<string>()
const activeInputableIndices = ref<number[]>([])
const activeInputIndices = ref<number[]>([])

const activeInputString = computed(() => activeInputIndices.value.map(i => activeWord.value![i]).join(''))
const hintPrefixedActiveInputString = computed(() => activeHintPrefix.value + activeInputString.value)
const isActiveWordSolved = computed(() => hintPrefixedActiveInputString.value === activeWord.value)

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
    activeInputableIndices.value = ((Array.range(inputableStartIndex, activeWord.value.length, 1)).shuffle())
    
    activeInputIndices.value = []
  }
  
  resetDailyHistoryIfNeeded()
}

function onInput(index: number) { 
  if (index >= 0) {
    activeInputIndices.value.push(index)
    
    if (isActiveWordSolved.value) {
      saveDailyWord(activeWord.value!)
    }
  } else {
    activeInputIndices.value.pop()
  }
}

function onToolSelected(tool: WordToolKey) {
  if (activeWord.value === undefined)
    return

  switch (tool) {
    case WordToolKey.Define:
    case WordToolKey.ImageSearch:
    case WordToolKey.Translate:
    case WordToolKey.WikipediaSearch:
    case WordToolKey.WebSearch:
      openWordToolPage(tool, activeWord.value)
      break
    case WordToolKey.Continue:
      resetActiveWord()
      break
    case WordToolKey.Hint:
      const fixedOrExtendedInputIndices = fixOrExtendInput(activeWord.value, activeInputIndices.value, activeInputableIndices.value)
      if (fixedOrExtendedInputIndices) {
        activeInputIndices.value = fixedOrExtendedInputIndices
      }
      break
  }
}

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
  <span id="spinner" v-if="!activeWord"></span>
  
  <NavigationBar :items="navigationItems"/>
  
  <main class="game" v-if="activeWord">
    <WordScreen 
      :input="activeHintPrefix + activeInputString"
      :is-word-completed="isActiveWordSolved"
    />
    <WordGamepad 
      ref="gamepad"
      :word="activeWord!" 
      :inputable-indices="activeInputableIndices"
      :input-indices="activeInputIndices"
      :is-word-solved="isActiveWordSolved"
      @reset-active-word="resetActiveWord" 
      @tool-selected="onToolSelected" 
      @input="onInput"
    />
  </main>
</template>
