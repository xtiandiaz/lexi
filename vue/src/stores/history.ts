import '@/assets/tungsten/extensions/date.extensions'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DailyHistory } from '@/models/history'
import type { Language } from '@/models/language'
import settingsStore from './settings'
import { retrieveDailyHistories } from '@/services/history-management'

export default defineStore('history', () => {
  const settings = settingsStore()
  
  const dailyHistories = ref<DailyHistory[]>(retrieveDailyHistories() ?? [])
  
  const currentDailyHistory = computed<DailyHistory | undefined>(() => {
    return dailyHistories.value.find(dh => dh.language === settings.currentLanguage)
  })
  const currentTermCount = computed(() => currentDailyHistory.value?.completedTerms.length ?? 0)
  const isDailyGoalReached = computed(() => currentTermCount.value >= settings.currentDailyGoal.termCount)
  
  return {
    dailyHistories,
    currentDailyHistory,
    currentTermCount,
    isDailyGoalReached,
    dailyHistory: (language: Language) => dailyHistories.value.find(dh => dh.language === language),
  }
})
