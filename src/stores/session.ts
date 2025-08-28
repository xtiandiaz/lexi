import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from 'vue'
import type { Term } from '@/models/content.models'
import useHistoryStore from '@/stores/history'
import useGameStore from '@/stores/game'
import useContentStore from '@/stores/content'
import { prepareTermToGuess } from "@/utils/game.utils";
import '@/assets/tungsten/extensions/date.extensions'

export default defineStore('session', () => {  
  const content = useContentStore()
  const history = useHistoryStore()
  const gameStore = useGameStore()
  const { settings } = storeToRefs(gameStore)
  const dailyGoalSettings = computed(() => settings.value.dailyGoal)
  
  const terms = ref<Term[]>(history.dailyHistory.terms)
  const currentTermIndex = ref(history.dailyHistory.currentIndex ?? 0)
  
  const explorationExtent = computed(() => Math.max(dailyGoalSettings.value.termCount, terms.value.length))
  
  async function resetTerms() {
    const goalCount = settings.value.dailyGoal.termCount
    const savedTerms = history.dailyHistory?.terms ?? []
    const missingTermCount = goalCount - savedTerms.length
    
    if (missingTermCount <= 0) {
      terms.value = savedTerms.slice(0, goalCount)
    } else {
      const newTerms = await content.getNewTerms(missingTermCount, settings.value.activeLanguages)
      newTerms.forEach(t => prepareTermToGuess(t))
      
      terms.value = savedTerms.concat(newTerms)
    }
    
    currentTermIndex.value = Math.min(currentTermIndex.value, terms.value.length - 1)
  }
  
  return {
    currentTermIndex,
    terms,
    
    explorationExtent,
    resetTerms
  }
})
