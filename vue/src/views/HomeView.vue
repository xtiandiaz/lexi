<script setup lang="ts">
import { ref } from 'vue'
// import TheWelcome from '../components/TheWelcome.vue'
// import wordListing from '../words/es.txt?raw'

enum WordAction {
  Define, 
  Search,
  SearchForImages
}

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

function runWordAction(action: WordAction, word: string | undefined): void {
  if (word === undefined) {
    return
  }
  
  const url = (() => {
    switch (action) {
      case WordAction.Define:
        return `https://dle.rae.es/${word}`
      case WordAction.Search:
        return `https://duckduckgo.com/?t=ffab&q=${activeWord.value}`
      case WordAction.SearchForImages:
        return `https://duckduckgo.com/?t=ffab&q=${activeWord.value}&iax=images&ia=images`
    }
  })()
  
  window.open(url, '_blank')
}
</script>

<template>
  <!-- <main> -->
    <h1 id="slate" class="serif" v-if="(words?.length ?? 0) != 0">{{ activeWord }}</h1>
    <div class="button-bar">
      <button class="iconized" v-on:click="runWordAction(WordAction.Define, activeWord)">
        <span class="icon define"></span>
      </button>
      <button class="iconized" v-on:click="runWordAction(WordAction.Search, activeWord)">
        <span class="icon search"></span>
      </button>
      <button class="iconized" v-on:click="runWordAction(WordAction.SearchForImages, activeWord)">
        <span class="icon search-images"></span>
      </button>
    </div>
    <button class="iconized" v-on:click="resetActiveWord">
      <span class="icon reset"></span>
    </button>
    <span class="caption all-caps">©2025 XD</span>
  <!-- </main> -->
</template>
