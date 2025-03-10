import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { LanguageKey } from '../models/language'

export default defineStore('settings', {  
  state: () => {
    const activeLanguage = ref<LanguageKey>(LanguageKey.Español)
    const wikipediaSearchUrl = computed(() => `https://${activeLanguage.value}.wikipedia.org/wiki/`)
    
    return {
      activeLanguage: activeLanguage,
      webSearchUrl: 'https://duckduckgo.com/?t=ffab&q=',
      imageSearchUrl: 'https://duckduckgo.com/?t=ffab&iax=images&ia=images&q=',
      languages: new Map([
        [LanguageKey.Español, { 
          dictionaryUrl: 'https://dle.rae.es/' 
        }]
      ]),
      wikipediaSearchUrl: wikipediaSearchUrl
    }
  }
})
