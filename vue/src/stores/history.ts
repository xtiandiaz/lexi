import { defineStore } from 'pinia'
import type { IDailyHistory } from '@/models/history'

export const historyStore = defineStore('history', {
  state: (): IDailyHistory => {
    return {
      words: []
    }
  }
})
