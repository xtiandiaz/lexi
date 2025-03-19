import '@/assets/tungsten/extensions/date.extensions'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DailyHistory } from '@/models/history'
import { retrieveDailyHistory } from '@/services/history-management'

export default defineStore('history', () => { 
  const dailyHistory = ref<DailyHistory>(retrieveDailyHistory() ?? {
    date: Date.today(),
    completedTerms: []
  })
  
  return {
    daily: dailyHistory,
    dailyCompletedTermsCount: () => dailyHistory.value.completedTerms.length
  }
})
