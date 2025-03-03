import { defineStore } from 'pinia'
import { Language, GameMode, type ISettings } from '../models/settings'

export const settingsStore = defineStore('settings', {
  state: (): ISettings => {
    return {
      language: Language.Español,
      mode: GameMode.Words
    }
  }
})
