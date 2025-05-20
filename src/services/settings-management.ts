import { type Settings } from '@/models/settings'
import { LocalStorageItemKey } from '@/models/persistence'
import settingsStore from '@/stores/settings'
import { retrieve, save } from '@/assets/tungsten/local-storage'

export function retrieveSavedSettings(): Settings | undefined {
  const savedSettings = retrieve<Settings>(LocalStorageItemKey.Settings)
  
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
    LocalStorageItemKey.Settings, 
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
