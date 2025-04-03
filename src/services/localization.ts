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
  const key = (() => {
    switch (tag) {
      case TermTag.Anatomy: return LocalizedStringKey.TermTag_Anatomy
      case TermTag.Biochemistry: return LocalizedStringKey.TermTag_Biochemistry
      case TermTag.Bird: return LocalizedStringKey.TermTag_Bird
      case TermTag.Botany: return LocalizedStringKey.TermTag_Botany
      case TermTag.Chemisty: return LocalizedStringKey.TermTag_Chemisty
      case TermTag.Geometry: return LocalizedStringKey.TermTag_Geometry
      case TermTag.Medicine: return LocalizedStringKey.TermTag_Medicine
      case TermTag.Physics: return LocalizedStringKey.TermTag_Physics
      case TermTag.Physiology: return LocalizedStringKey.TermTag_Physiology
      case TermTag.Plant: return LocalizedStringKey.TermTag_Plant
    }
  })()
  
  return localizedString(key as LocalizedStringKey)
}
