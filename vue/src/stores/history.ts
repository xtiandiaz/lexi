import '@/assets/tungsten/extensions/date.extensions'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { LocalStorageKey, retrieve } from '@/services/persistence'

export const dailyHistoryStore = defineStore('daily-history', {
  state: () => {
    const date = ref<Date>(new Date(retrieve(LocalStorageKey.Day) ?? Date.today().getTime()))
    const words = ref<string[]>(retrieve(LocalStorageKey.DailyWords)?.split(';') ?? [])
    const wordCount = computed(() => words.value.length)
    
    return {
      date: date,
      words: words,
      wordCount: wordCount
    }
  }
})
