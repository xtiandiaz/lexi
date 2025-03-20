import { ref } from "vue";
import { defineStore } from "pinia";
import { type Lexicon } from '@/models/content'

export default defineStore('content', () => {
  const lexicon = ref<Lexicon>()
  
  function randomTerm(): string | undefined {
    return lexicon.value?.terms[Math.floor(Math.random() * lexicon.value.terms.length)]
  }
  
  return {
    lexicon,
    randomTerm
  }
})
