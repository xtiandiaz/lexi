import { type Settings } from '@/models/settings'
import { LocalStorageItemKey } from '@/models/persistence'
import settingsStore from '@/stores/settings'
import { retrieve, save } from '@/assets/tungsten/local-storage'

export function retrieveSavedSettings(): Settings | undefined {
  return retrieve<Settings>(LocalStorageItemKey.Settings)
}

export function saveSettings() {
  const settings = settingsStore()
  
  save<Settings>(
    LocalStorageItemKey.Settings, 
    {
      activeLanguages: [...settings.activeLanguages],
      languagesSettings: settings.languagesSettings,
      preferredLanguage: settings.preferredLanguage
    }
  )
}

export function storeAndSaveSelectedSettings(selectedSettings: Settings) {
  if (selectedSettings.activeLanguages.length === 0) {
    console.error("Insufficient languages to store and save")
    return
  }
  
  const settings = settingsStore()
  
  settings.activeLanguages = selectedSettings.activeLanguages
  settings.preferredLanguage = selectedSettings.preferredLanguage
  
  saveSettings()
}
