import { Language, LocalizedString } from "@/models/language"
import ES from '@/assets/localization/es'
import EN from '@/assets/localization/en'
import settingsStore from "@/stores/settings"

export function localizedStringInLanguage(key: LocalizedString, language: Language): string | undefined {
  switch (language) {
    case Language.Spanish: return ES.get(key)
    case Language.English: return EN.get(key)
  }
}

export function localizedString(key: LocalizedString): string {
  const settings = settingsStore()
  return localizedStringInLanguage(key, settings.currentLanguage) ?? `{LocalizedStringKey: ${key}}`
}
