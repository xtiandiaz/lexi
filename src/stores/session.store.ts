import { defineStore } from "pinia";
import { computed, ref, watch } from 'vue'
import type { Term } from '@/models/content.models'
import useGameStore from '@/stores/game'
import useContentStore from '@/stores/content.store'
import { retrieveSession } from "@/services/session-management";
import { prepareTermToGuess } from "@/utils/game.utils";
import '@/assets/tungsten/extensions/date.extensions'
import type { Language } from "@/models/localization";

export default defineStore('session', () => {
  const rawSession = retrieveSession()
  
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
    terms.value = await content.getTerms(settings.dailyGoal.termCount, settings.activeLanguages)
  }
  
  return {
    currentTermIndex,
    latestActivityAt,
    terms,
    
    explorationExtent,
    resetTerms
  }
})
