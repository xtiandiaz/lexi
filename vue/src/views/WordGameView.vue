<script setup lang="ts">
import { ref, computed } from 'vue'
import WordScreen from '@/components/WordScreen.vue'
import WordGamepad from '@/components/WordGamepad.vue'

const emits = defineEmits<{
  launchMeaning: [sourceURL: string]
}>()

const words = ref<string[]>()
const activeWord = ref<string>()
const activeWordSynonyms = ref<string[]>()

function resetActiveWord() {
  if (words.value === null || words.value!.length === 0) {
    return
  }
  const term = words.value![Math.floor(Math.random() * words.value!.length)]
  const linkedWords = term.split(',')
  activeWord.value = linkedWords[0]
  activeWordSynonyms.value = linkedWords.splice(1)
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
load()
</script>

<template>
  <span id="spinner" v-if="activeWord === undefined"></span>
  <main v-if="activeWord !== undefined">
    <WordScreen :word="activeWord" :synonyms="activeWordSynonyms ?? []" />
    <WordGamepad :word="activeWord" @reset-active-word="resetActiveWord" @launch-meaning="(sourceURL) => emits('launchMeaning', sourceURL)" />
  </main>
</template>
