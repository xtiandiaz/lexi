import { type Settings } from '@/models/settings'
import { Language } from '@/models/localization'
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
      minTermCountForTest: settings.minTermCountForTest,
      preferredLanguage: settings.preferredLanguage
    }
  )
}

export function storeAndSaveSelectedSettings(
  selectedLanguages: Language[], 
  preferredLanguage: Language
) {
  if (selectedLanguages.length === 0) {
    console.error("Insufficient languages to store and save")
    return
  }
  
  const settings = settingsStore()
  
  settings.activeLanguages = selectedLanguages
  settings.preferredLanguage = preferredLanguage
  
  saveSettings()
}
