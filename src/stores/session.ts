import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import type { Term } from '@/models/content.models'
import useHistoryStore from '@/stores/history'
import useGameStore from '@/stores/game'
import useContentStore from '@/stores/content'
import { retrieveSession } from "@/services/session-management";
import { prepareTermToGuess } from "@/utils/game.utils";
import '@/assets/tungsten/extensions/date.extensions'

export default defineStore('session', () => {
  const rawSession = retrieveSession()
  
  const history = useHistoryStore()
  const gameStore = useGameStore()
  const settings = gameStore.settings
  const content = useContentStore()
  const dailyGoalSettings = computed(() => settings.dailyGoal)
  
  const latestActivityAt = ref<Date>(
    rawSession?.latestActivityAt ? new Date(rawSession.latestActivityAt) : Date.today()
  )
  
  const terms = ref<Term[]>([])
  const currentTermIndex = ref(rawSession?.currentTermIndex ?? 0)
  
  const explorationExtent = computed(() => Math.max(dailyGoalSettings.value.termCount, terms.value.length))
  
  async function resetTerms() {
    const savedTerms = history.dailyHistory?.terms ?? []
    const missingTermCount = settings.dailyGoal.termCount - savedTerms.length
    const newTerms = missingTermCount > 0 
      ? await content.getNewTerms(missingTermCount, settings.activeLanguages) 
      : []
    newTerms.forEach(t => prepareTermToGuess(t))
    
    terms.value = savedTerms.concat(newTerms)
  }
  
  return {
    currentTermIndex,
    latestActivityAt,
    terms,
    
    explorationExtent,
    resetTerms
  }
})
