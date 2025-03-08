import '@/assets/tungsten/extensions/date.extensions'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const dailyHistoryStore = defineStore('daily-history', {
  state: () => {
    const date = ref<Date>(Date.today())
    const words = ref<string[]>([])
    const wordCount = computed(() => words.value.length)
    
    return {
      date: date,
      words: words,
      wordCount: wordCount
    }
  }
})
