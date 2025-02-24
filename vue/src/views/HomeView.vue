<script setup lang="ts">
import { ref } from 'vue'
import { settingsStore } from '../stores/settings'
// import TheWelcome from '../components/TheWelcome.vue'
// import wordListing from '../words/es.txt?raw'

enum WordAction {
  Define, 
  Search,
  SearchForImages
}

const words = ref<string[]>()
const activeWord = ref<string>()
const synonyms = ref<string>()
const isLoaded = ref<boolean>(false)
const settings = settingsStore()

function resetActiveWord() {
  if (words.value === null || words.value!.length === 0) {
    return
  }
  const term = words.value![Math.floor(Math.random() * words.value!.length)]
  const linkedWords = term.split(',')
  activeWord.value = linkedWords[0]
  
  if (linkedWords.length > 1) {
    synonyms.value = linkedWords.splice(1).join(', ')
  } else {
    synonyms.value = ""
  }
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

// const emits = defineEmits<{isLoading?: boolean}>()

// export default {
//   emits: emits
// }

</script>

<template>
  <!-- <main> -->
    <span id="spinner" v-show="!isLoaded"></span>
    <div id="slate" v-if="(words?.length ?? 0) != 0">
      <h1 class="serif">{{ activeWord }}</h1>
      <h6 class="serif" v-if="(synonyms?.length ?? 0) != 0">{{ synonyms }}</h6>
    </div>
    <div class="button-bar" v-show="isLoaded">
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
    <div class="button-bar">
      <button class="iconized" v-on:click="resetActiveWord">
        <span class="icon reset"></span>
      </button>
    </div>
    <span class="caption all-caps">Mode: {{ settings.$state.mode }}</span>
  <!-- </main> -->
</template>
