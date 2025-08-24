import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LanguageTermCollection, Term } from '@/models/content.models'
import { getRandomChoice } from '@/assets/tungsten/randomness'
import { loadContent } from '@/services/content.services'
import type { Language } from '@/models/localization'

export default defineStore('content', () => {  
  const _languageTermCollections = ref<LanguageTermCollection[]>([])
  
  async function load(languages: Language[]) {
    _languageTermCollections.value = await loadContent(languages)
    console.log("loaded collections", _languageTermCollections.value)
  }
  
  async function getTerms(count: number, languages: Language[]): Promise<Term[]> {
    await load(languages)
    
    const indices = Object.fromEntries(languages.map(l => [l, 0]))
    
    return Array.range(0, count).map(() => {
      const collection = getRandomChoice(_languageTermCollections.value)
      const term = collection.terms[indices[collection.language]++]
      console.log(collection, term)
      
      return term
    })
  }
  
  return {
    load,
    getTerms
  }
})
