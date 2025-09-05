import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from 'vue'
import type { Term } from '@/models/content'
import useGameStore from '@/stores/game'
import useContentStore from '@/stores/content'
import { retrievedSavedSession } from "@/services/session-management";
import { prepareTermToGuess } from "@/utils/game.utils";
import '@/assets/tungsten/extensions/date.extensions'

export default defineStore('session', () => {
  const savedSession = retrievedSavedSession()
  const latestActivityAt = ref<Date>(new Date(savedSession?.latestActivityAt ? savedSession.latestActivityAt : 0))
  const terms = ref<Term[]>(savedSession?.terms ?? [])
  const currentTermIndex = ref(savedSession?.currentTermIndex)
  
  const date = computed(() => latestActivityAt.value.removeTime())
  
  const content = useContentStore()
  const gameStore = useGameStore()
  const { settings } = storeToRefs(gameStore)
  
  const activeTerms = ref<Term[]>()
  
  async function updateActiveTerms() {
    const activeLanguages = settings.value.activeLanguages
    const goalCount = settings.value.dailyGoal.termCount
    
    const usableTerms = terms.value.filter(t => activeLanguages.includes(t.language))
    const missingTermCount = goalCount - usableTerms.length
    
    if (missingTermCount <= 0) {
      activeTerms.value = usableTerms.slice(0, goalCount)
      
      currentTermIndex.value = Math.min(currentTermIndex.value ?? 0, activeTerms.value.length - 1)
    } else {
      const newTerms = await content.getNewTerms(missingTermCount, activeLanguages)
      newTerms.forEach(t => prepareTermToGuess(t))
      
      activeTerms.value = usableTerms.concat(newTerms)
      terms.value = terms.value.concat(newTerms)
      
      currentTermIndex.value = 0
    }
  }
  
  return {
    activeTerms,
    allTerms: terms,
    currentTermIndex,
    date,
    latestActivityAt,
    
    updateActiveTerms
  }
})
