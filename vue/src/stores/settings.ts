import { defineStore } from 'pinia'

export enum GameMode {
  Words = 'Words',
  Excerpts = 'Excerpts'
}

export interface ISettings {
  mode: GameMode
}

export const settingsStore = defineStore('settings', {
  state: (): ISettings => {
    return {
      mode: GameMode.Words
    }
  }
})
