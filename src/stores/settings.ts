import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Language } from '@/models/localization'
import { type LanguageSettings, defaultLanguageSettings, defaultMinTermCountForTest } from '@/models/settings'
import { retrieveSavedSettings } from '@/services/settings-management'

export default defineStore('settings', () => {
  const savedSettings = retrieveSavedSettings()
  
  const languagesSettings: LanguageSettings[] = Object.values(Language).map(lang => {
    const savedLanguageSettings = savedSettings?.languagesSettings.find(ls => ls.language === lang)
    
    return savedLanguageSettings ?? defaultLanguageSettings(lang)
  })
  
  const activeLanguages = ref<Language[]>(savedSettings?.activeLanguages ?? [Language.Spanish])
  const preferredLanguage = ref<Language>(savedSettings?.preferredLanguage ?? activeLanguages.value[0])
  
  function getSettingsForLanguage(language: Language): LanguageSettings {
    return languagesSettings.find(ls => ls.language === language)!
  }
  
  return {
    activeLanguages,
    languagesSettings,
    minTermCountForTest: defaultMinTermCountForTest,
    preferredLanguage,
    
    getSettingsForLanguage
  }
})
