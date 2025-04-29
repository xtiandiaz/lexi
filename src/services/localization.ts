import { LocalizedStringKey } from "@/models/localization"
import { Language } from "@/models/language"
import { TermTag } from "@/models/content"
import settingsStore from "@/stores/settings"
import ES from '@/assets/localization/es'
import EN from '@/assets/localization/en'
import { dateLocaleString } from "@/utils/date.utils"

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

export const dynamicLocalizedString = (key: LocalizedStringKey, ...args: unknown[]): string => {
  const settings = settingsStore()
  
  switch (key) {
    case LocalizedStringKey.Title_HistoryOfToday:
      const dayDiff = args[0] as number
      
      if (dayDiff >= 2) {
        const date = args[1] as Date
        return localizedString(LocalizedStringKey.Title_HistoryFromDate).replace(
          /{date}/, 
          dateLocaleString(date, settings.currentLanguage)
        )
      } else if (dayDiff >= 1) {
        return localizedString(LocalizedStringKey.Title_HistoryOfYesterday)
      }
      break
  }
  
  return localizedString(key)
}

export const localizedStringForTermTag = (tag: TermTag): string => {
  const key = Object.values(LocalizedStringKey).find(v => v === tag) as (LocalizedStringKey | undefined)
  // console.log('tag localized string key', key)
  
  return key ? localizedString(key) : `#${tag}`
}
