<script setup lang="ts">
import '@/assets/tungsten/extensions/array.extensions'
import { ref, computed, onMounted } from 'vue'
import WordScreen from '@/components/WordScreen.vue'
import WordGamepad from '@/components/WordGamepad.vue'
import { shuffle } from '@/assets/tungsten/randomness'
import { clamp } from '@/assets/tungsten/math'

const emits = defineEmits<{
  launchMeaning: [sourceURL: string]
}>()

const words = ref<string[]>()
const activeWord = ref<string>()
const activeWordSynonyms = ref<string[]>()
const hintPrefix = ref<string>()
const inputableLetterIndices = ref<number[]>([])
const activeInput = ref<string>('')

const isActiveWordCompleted = computed(() => activeInput.value === activeWord.value)

function resetActiveWord() {
  if (words.value === null || words.value!.length === 0) {
    return
  }
  const term = words.value![Math.floor(Math.random() * words.value!.length)]
  const linkedWords = term.split(',')
  
  activeWord.value = linkedWords[0]
  activeWordSynonyms.value = linkedWords.splice(1)
  
  const INPUTABLE_START_INDEX = clamp(Math.ceil(activeWord.value.length * 0.25), 1, Math.floor(activeWord.value.length / 2))
  hintPrefix.value = activeWord.value.substring(0, INPUTABLE_START_INDEX)
  inputableLetterIndices.value = shuffle(Array.range(INPUTABLE_START_INDEX, activeWord.value.length, 1))
  
  activeInput.value = hintPrefix.value
}

async function load() {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/xtiandiaz/lexicon/refs/heads/main/words/es.txt?salt=${Math.random()}`)
    // console.log(response)
    const wordListing = await response.text()
    // console.log(wordListing)
    words.value = wordListing.split('\n')
    
    resetActiveWord()
  } catch (error) {
    console.log(error)
  }
}

function onInputChanged(letterIndices: number[]) {
  activeInput.value = hintPrefix.value + letterIndices.map(i => activeWord.value![i]).join('')
}

onMounted(() => {
  load()
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
      :is-word-completed="isActiveWordCompleted"
      @reset-active-word="resetActiveWord" 
      @launch-meaning="(sourceURL) => emits('launchMeaning', sourceURL)" 
      @update-input="onInputChanged"
    />
  </main>
</template>
