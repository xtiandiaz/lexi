import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from 'vue'
import { retrievedSavedSession } from "@/services/session-management";
import useGameStore from '@/stores/game'
import useContentStore from '@/stores/content'
import { prepareTermToGuess } from "@/utils/game.utils";
import '@/assets/tungsten/extensions/date.extensions'

export default defineStore('session', () => {  
  const savedSession = retrievedSavedSession()
  const date = ref(savedSession?.date ?? Date.today())
  const terms = ref(savedSession?.terms ?? [])
  const currentTermIndex = ref(savedSession?.currentTermIndex)
  
  const content = useContentStore()
  const gameStore = useGameStore()
  const { settings } = storeToRefs(gameStore)
  const dailyGoalSettings = computed(() => settings.value.dailyGoal)
  
  const explorationExtent = computed(() => Math.max(dailyGoalSettings.value.termCount, terms.value.length))
  
  async function resetTerms() {
    const goalCount = settings.value.dailyGoal.termCount
    const missingTermCount = goalCount - terms.value.length
    
    if (missingTermCount <= 0) {
      terms.value = terms.value.slice(0, goalCount)
    } else {
      const newTerms = await content.getNewTerms(missingTermCount, settings.value.activeLanguages)
      newTerms.forEach(t => prepareTermToGuess(t))
      
      terms.value = terms.value.concat(newTerms)
    }
    
    currentTermIndex.value = Math.min(currentTermIndex.value ?? 0, terms.value.length - 1)
  }
  
  return {
    currentTermIndex,
    date,
    terms,
    
    explorationExtent,
    resetTerms
  }
})
