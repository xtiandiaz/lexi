import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DailyHistory } from '@/models/history'
import { retrieveSavedDailyHistory } from '@/services/history-management'
import '@/assets/tungsten/extensions/date.extensions'

export default defineStore('history', () => {
  const dailyHistory = ref<DailyHistory>(retrieveSavedDailyHistory() ?? {
    date: Date.today(),
    terms: [],
  })
  
  const currentTermCount = computed(() => dailyHistory.value?.terms.length ?? 0)
  
  return {
    currentTermCount,
    dailyHistory,
  }
})
