import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Language } from '../models/language'

export const settingsStore = defineStore('settings', {  
  state: () => {
    const activeLanguage = ref<Language>(Language.Español)
    const wikipediaSearchUrl = computed(() => `https://${activeLanguage.value}.wikipedia.org/wiki/`)
    
    return {
      activeLanguage: activeLanguage,
      webSearchUrl: 'https://duckduckgo.com/?t=ffab&q=',
      imageSearchUrl: 'https://duckduckgo.com/?t=ffab&iax=images&ia=images&q=',
      languages: new Map([
        [Language.Español, { 
          dictionaryUrl: 'https://dle.rae.es/' 
        }]
      ]),
      wikipediaSearchUrl: wikipediaSearchUrl
    }
  }
})
