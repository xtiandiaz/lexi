import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore('content', () => {
  const termListing = ref<string[]>([])
  
  function randomTerm(): string {
    return termListing.value[Math.floor(Math.random() * termListing.value.length)]
  }
  
  return {
    termListing,
    randomTerm
  }
})
