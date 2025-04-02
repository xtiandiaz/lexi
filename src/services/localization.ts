import { Language, LocalizedString } from "@/models/language"
import ES from '@/assets/localization/es'
import EN from '@/assets/localization/en'
import settingsStore from "@/stores/settings"

export const localizedStringInLanguage = (key: LocalizedString, language: Language): string | undefined => {
  switch (language) {
    case Language.Spanish: return ES.get(key)
    case Language.English: return EN.get(key)
  }
}

export const localizedString = (key: LocalizedString, pluralized: boolean = false): string => {
  const settings = settingsStore()
  
  const _string =  localizedStringInLanguage(key, settings.currentLanguage)
  if (_string) {
    return _string + (pluralized ? 's' : '')
  }
  
  return `{LocalizedStringKey: ${key}}`
}
