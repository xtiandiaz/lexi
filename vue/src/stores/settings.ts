import { defineStore } from 'pinia'
import { Language, type ISettings } from '../models/settings'

export const settingsStore = defineStore('settings', {
  state: (): ISettings => {
    return {
      activeLanguage: Language.Español,
      webSearchUrl: 'https://duckduckgo.com/?t=ffab&q=',
      imageSearchUrl: 'https://duckduckgo.com/?t=ffab&iax=images&ia=images&q=',
      languages: new Map([
        [Language.Español, {
          language: Language.Español,
          dictionaryUrl: 'https://dle.rae.es/',
        }]
      ]),
    }
  }
})
