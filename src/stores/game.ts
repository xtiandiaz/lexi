import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Settings } from '@/models/game'
import { retrieveSavedSettings } from '@/services/settings-management'
import { defaultSettings } from '@/utils/settings.utils'

export default defineStore('game', () => {
  const settings = ref<Settings>(retrieveSavedSettings() ?? defaultSettings)
  
  const preferredLanguage = computed(() => settings.value.activeLanguages.last()!)
  
  return {
    preferredLanguage,
    settings,
  }
})
