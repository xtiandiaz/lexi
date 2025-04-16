import { type Settings } from '@/models/settings'
import settingsStore from '@/stores/settings'
import { LocalStorageItem, retrieve, save } from './persistence'

export function retrieveSavedSettings(): Settings | undefined {
  const savedSettings = retrieve<Settings>(LocalStorageItem.Settings)
  // if (savedSettings) {
    // for (let i=0; i < savedSettings.languagesSettings.length; i++) {
      // if (!savedSettings.languagesSettings[i].dailyGoal) {
      //   savedSettings.languagesSettings[i].dailyGoal = defaultDailyGoalSettings
      // }
    // }
  // }
  
  return savedSettings
}

export function saveSettings() {
  const settings = settingsStore()
  
  save<Settings>(
    LocalStorageItem.Settings, 
    {
      currentLanguage: settings.currentLanguage,
      languagesSettings: settings.languagesSettings,
      minTermCountForTest: settings.minTermCountForTest
    }
  )
}

export function storeAndSaveSelectedSettings(selectedSettings: Settings) {
  const settings = settingsStore()
  
  settings.currentLanguage = selectedSettings.currentLanguage
  
  saveSettings()
}
