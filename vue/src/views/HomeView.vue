<script setup lang="ts">
import { ref } from 'vue'
// import TheWelcome from '../components/TheWelcome.vue'
import wordListing from '../words/es.txt?raw'
const words = ref(wordListing.split('\n'))
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
