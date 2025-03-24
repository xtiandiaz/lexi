import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Language } from '@/models/language'
import { type LanguageSettings, defaultLanguageSettings } from '@/models/settings'
import { retrieveSettings } from '@/services/settings-management'

export default defineStore('settings', () => {
  const savedSettings = retrieveSettings()
  
  const languagesSettings: LanguageSettings[] = Object.values(Language).map(lang => {
    const savedLanguageSettings = savedSettings?.languagesSettings.find(ls => ls.language === lang)
    return savedLanguageSettings ?? defaultLanguageSettings(lang)
  })
  const languageSettings = (language: Language) => languagesSettings.find(ls => ls.language === language)!
  
  const currentLanguage = ref<Language>(savedSettings?.currentLanguage ?? Language.Spanish)
  
  const currentLanguageSettings = computed(() => languageSettings(currentLanguage.value))
  const currentDailyGoal = computed(() => currentLanguageSettings.value.dailyGoal)
  
  return {
    currentLanguage,
    currentLanguageSettings,
    currentDailyGoal,
    languagesSettings,    
    minReviewTermCount: savedSettings?.minReviewTermCount ?? 5,
    
    languageSettings,
  }
})
