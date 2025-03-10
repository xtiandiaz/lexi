import { LanguageKey, LocalizedStringKey } from "@/models/language"
import ES from '@/assets/localization/es'
import EN from '@/assets/localization/en'
import settingsStore from "@/stores/settings"

function _localizedString(key: LocalizedStringKey, language: LanguageKey): string | undefined {
  switch (language) {
    case LanguageKey.Español: return ES.get(key)
    case LanguageKey.English: return EN.get(key)
  }
}

export function localizedString(key: LocalizedStringKey): string | undefined {
  const settings = settingsStore()
  return _localizedString(key, settings.activeLanguage)
}
