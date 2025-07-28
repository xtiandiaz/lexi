import { type Settings } from '@/models/settings'
import { LocalStorageItemKey } from '@/models/persistence'
import useGameStore from '@/stores/game'
import { retrieve, save } from '@/assets/tungsten/local-storage'
import { defaultLanguagesSettings } from '@/utils/settings.utils'

export function retrieveSavedSettings(): Settings | undefined {
  const _settings = retrieve<Settings>(LocalStorageItemKey.Settings)
  if (_settings && !_settings.languagesSettings) {
    _settings.languagesSettings = defaultLanguagesSettings
  }
  
  return _settings
}

export function saveSettings() {
  save<Settings>(LocalStorageItemKey.Settings, useGameStore().settings)
}

export function storeAndSaveSelectedSettings(selectedSettings: Settings) {
  if (selectedSettings.activeLanguages.length === 0) {
    console.error("Insufficient languages to store and save")
    return
  }
  
  saveSettings()
}
