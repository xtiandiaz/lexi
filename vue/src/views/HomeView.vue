<script setup lang="ts">
import { ref } from 'vue'
// import TheWelcome from '../components/TheWelcome.vue'
// import wordListing from '../words/es.txt?raw'

const words = ref<string[]>()

async function load() {
  try {
    const response = await fetch("./words/es.txt")
    console.log(response)
    const wordListing = await response.text()
    console.log(wordListing)
    words.value = wordListing.split('\n')
  } catch (error) {
    console.log(error)
  }
}

load()
</script>

<template>
  <main>
    <ul>
      <li v-for="(word, index) in words" :key="index">
        {{ word }}
      </li>
    </ul>
  </main>
</template>
