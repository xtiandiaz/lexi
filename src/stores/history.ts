import '@/assets/tungsten/extensions/date.extensions'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DailyHistory } from '@/models/history'
import useGameStore from './game'
import { retrieveSavedDailyHistory } from '@/services/history-management'

export default defineStore('history', () => {
  const settings = useGameStore().settings
  
  const dailyHistory = ref<DailyHistory | undefined>(retrieveSavedDailyHistory())
  
  const currentTermCount = computed(() => dailyHistory.value?.completedTerms.length ?? 0)
  const canTakeTest = computed(() => currentTermCount.value >= settings.minTermCountForTest)
  
  return {
    canTakeTest,
    currentTermCount,
    dailyHistory
  }
})
