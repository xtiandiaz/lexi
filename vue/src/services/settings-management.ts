import { type Settings } from '@/models/settings'
import type { Language } from '@/models/language'
import settingsStore from '@/stores/settings'
import { LocalStorageItem, retrieve, save } from './persistence'

export function retrieveSettings(): Settings | undefined {
  return retrieve<Settings>(LocalStorageItem.Settings)
}

export function saveSettings() {
  const settings = settingsStore()
  
  save<Settings>(
    LocalStorageItem.Settings, 
    {
      currentLanguage: settings.currentLanguage,
      languagesSettings: settings.languagesSettings
    }
  )
}

export function resetCurrentLanguage(language: Language) {
  const settings = settingsStore()
  
  settings.currentLanguage = language
  
  saveSettings()
}
