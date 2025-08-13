import type { Settings } from '@/models/game'
import useGameStore from '@/stores/game'
import { defaultDailyGoalSettings, defaultLanguagesSettings } from '@/utils/settings.utils'
import { retrieve, save } from '@/assets/tungsten/local-storage'

const settingsKey = 'settings'

export function retrieveSavedSettings(): Settings | undefined {
  const settings = retrieve<Settings>(settingsKey)
  if (settings) {
    if (!settings.languagesSettings) {
      settings.languagesSettings = defaultLanguagesSettings
    }
    if (!settings.dailyGoal) {
      settings.dailyGoal = defaultDailyGoalSettings
    }
  }
  
  return settings
}

export function saveSettings() {
  save<Settings>(settingsKey, useGameStore().settings)
}

export function storeAndSaveSelectedSettings(selectedSettings: Settings) {
  if (selectedSettings.activeLanguages.length === 0) {
    console.error("Insufficient languages to store and save")
    return
  }
  
  useGameStore().settings = selectedSettings
  
  saveSettings()
}
