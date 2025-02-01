<script setup lang="ts">
import { ref } from 'vue'
// import TheWelcome from '../components/TheWelcome.vue'
// import wordListing from '../words/es.txt?raw'

const words = ref<string[]>()
const activeWord = ref<string>()

function resetActiveWord() {
  if (words.value === null || words.value!.length === 0) {
    return
  }
  const term = words.value![Math.floor(Math.random() * words.value!.length)]
  activeWord.value = term.split(',')[0]
}

async function load() {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/xtiandiaz/lexicon/refs/heads/main/words/es.txt?salt=${Math.random()}`)
    console.log(response)
    const wordListing = await response.text()
    console.log(wordListing)
    words.value = wordListing.split('\n')
    resetActiveWord()
  } catch (error) {
    console.log(error)
  }
}

load()
</script>

<template>
  <!-- <main>     -->
    <h1 id="slate" v-if="(words?.length ?? 0) != 0">{{ activeWord }}</h1>
    <button class="emoji" v-on:click="resetActiveWord">🦄</button>
  <!-- </main> -->
</template>
