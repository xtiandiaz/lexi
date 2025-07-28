import { type Settings } from '@/models/settings'
import { LocalStorageItemKey } from '@/models/persistence'
import useGameStore from '@/stores/game'
import { retrieve, save } from '@/assets/tungsten/local-storage'

export function retrieveSavedSettings(): Settings | undefined {
  return retrieve<Settings>(LocalStorageItemKey.Settings)
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
