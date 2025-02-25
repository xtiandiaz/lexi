<script setup lang="ts">
import { ref } from 'vue'
import WordSlate from '@/components/WordSlate.vue'
import WordActionBar from '@/components/WordActionBar.vue'
import FooterActionsBar from '@/components/FooterActionsBar.vue'

const words = ref<string[]>()
const activeWord = ref<string>()
const activeWordSynonyms = ref<string[]>()
const isLoaded = ref<boolean>(false)

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
    isLoaded.value = true
    
    resetActiveWord()
  } catch (error) {
    console.log(error)
  }
}
load()

</script>

<template>
  <!-- <main> -->
    <span id="spinner" v-show="(words?.length ?? 0) === 0"></span>
    <WordSlate :word="activeWord" :synonyms="activeWordSynonyms ?? []" />
    <WordActionBar :word="activeWord" />
    <FooterActionsBar @reset-active-word="resetActiveWord" />
  <!-- </main> -->
</template>
