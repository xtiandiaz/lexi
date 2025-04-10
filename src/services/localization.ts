import { LocalizedStringKey } from "@/models/localization"
import { Language } from "@/models/language"
import { TermTag } from "@/models/content"
import settingsStore from "@/stores/settings"
import ES from '@/assets/localization/es'
import EN from '@/assets/localization/en'

export const localizedStringInLanguage = (key: LocalizedStringKey, language: Language): string => {
  const element: string | undefined = (() => {
    switch (language) {
      case Language.Spanish: return ES.get(key)
      case Language.English: return EN.get(key)
    }
  })()
  
  return element ?? `{LocalizedStringKey: ${key}, Language: ${language}}`
}

export const localizedString = (key: LocalizedStringKey, pluralized: boolean = false): string => {
  const settings = settingsStore()
  
  const _string = localizedStringInLanguage(key, settings.currentLanguage)
  if (_string) {
    return _string + (pluralized ? 's' : '')
  }
  
  return `{LocalizedStringKey: ${key}}`
}

export const localizedStringForTermTag = (tag: TermTag): string => {
  const key = Object.values(LocalizedStringKey).find(v => v === tag) as (LocalizedStringKey | undefined)
  // console.log('tag localized string key', key)
  
  return key ? localizedString(key) : `#${tag}`
}
