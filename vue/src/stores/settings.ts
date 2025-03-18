import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Language } from '../models/language'

export default defineStore('settings', {  
  state: () => {
    const currentLanguage = ref<Language>(Language.Español)
    const translationLanguage = ref<Language>(Language.English)
    const wikipediaSearchUrl = computed(() => `https://${currentLanguage.value}.wikipedia.org/wiki/`)
    const translatorUrl = computed(() => `https://www.wordreference.com/${currentLanguage.value}/${translationLanguage.value}/translation.asp?spen=`)
    
    return {
      activeLanguage: currentLanguage,
      imageSearchUrl: 'https://duckduckgo.com/?t=ffab&iax=images&ia=images&q=',
      webSearchUrl: 'https://duckduckgo.com/?t=ffab&q=',
      wikipediaSearchUrl: wikipediaSearchUrl,
      
      translationLanguage: translationLanguage,
      translatorUrl: translatorUrl,
      
      languages: new Map([
        [Language.Español, { 
          dictionaryUrl: 'https://dle.rae.es/' 
        }]
      ]),
    }
  }
})
