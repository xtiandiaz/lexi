import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LanguageTermCollection, Term } from '@/models/content'
import { getRandomChoice } from '@/assets/tungsten/randomness'
import { loadContent } from '@/services/content-provider'
import { Language } from '@/models/localization'

export default defineStore('content', () => {
  const _languageTermCollections = ref<LanguageTermCollection[]>([])
  const _selectionIndices = Object.fromEntries(Object.values(Language).map(l => [[l], 0]))
  
  async function load(languages: Language[]) {
    _languageTermCollections.value = await loadContent(languages)
    // console.log("loaded collections", _languageTermCollections.value)
  }
  
  async function getNewTerms(count: number, languages: Language[]): Promise<Term[]> {
    await load(languages)
    
    return Array.range(0, count).map(() => {
      const collection = getRandomChoice(_languageTermCollections.value)
      const term = collection.terms[_selectionIndices[collection.language]++]
      // console.log(collection, term, _selectionIndices)
      
      return term
    })
  }
  
  return {
    load,
    getNewTerms
  }
})
