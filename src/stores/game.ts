import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GameMode, Test } from '@/models/game'
import type { Settings } from '@/models/settings'
import type { InputState } from '@/models/input'
import { RawContent } from '@/models/content'
import { retrieveSavedSettings } from '@/services/settings-management'
import { retrievedSavedSession } from '@/services/session-management'
import { defaultSettings } from '@/utils/settings.utils'

export default defineStore('game', () => {
  const settings = ref<Settings>(retrieveSavedSettings() ?? defaultSettings)
  const preferredLanguage = computed(() => settings.value.activeLanguages.last()!)
  
  const content = ref<RawContent>()
  
  const inputState = ref<InputState | undefined>((() => {
    const savedSession = retrievedSavedSession()
    const inputLanguage = savedSession?.inputState?.term.language
    if (inputLanguage && settings.value.activeLanguages.includes(inputLanguage)) {
      return savedSession?.inputState
    }
    
    return undefined
  })())
  
  const test = ref<Test>()
  const mode = computed<GameMode>(() => test.value ? GameMode.Test : GameMode.Exploration)
  
  return {
    content,
    inputState,
    mode,
    preferredLanguage,
    settings,
    test
  }
})
