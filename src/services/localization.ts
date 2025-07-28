import { Language, LocalizedStringKey } from "@/models/localization"
import { TermTag } from "@/models/content"
import useGameStore from "@/stores/game"
import EN from '@/assets/localization/en'
import ES from '@/assets/localization/es'
import FI from '@/assets/localization/fi'
import { dateLocaleString } from "@/utils/date.utils"

export const localizedStringInLanguage = (key: LocalizedStringKey, language: Language): string => {
  const element: string | undefined = (() => {
    switch (language) {
      case Language.English: return EN.get(key)
      case Language.Finnish: return FI.get(key)
      case Language.Spanish: return ES.get(key)
    }
  })()
  
  return element ?? `{LocalizedStringKey: ${key}, Language: ${language}}`
}

export const localizedString = (key: LocalizedStringKey, pluralized: boolean = false): string => {
  const preferredLanguage = useGameStore().preferredLanguage
  
  const _string = localizedStringInLanguage(key, preferredLanguage)
  if (_string) {
    return _string + (pluralized && preferredLanguage !== Language.Finnish ? 's' : '')
  }
  
  return `{LocalizedStringKey: ${key}}`
}

export const dynamicLocalizedString = (key: LocalizedStringKey, ...args: unknown[]): string => {
  const preferredLanguage = useGameStore().preferredLanguage
  
  switch (key) {
    case LocalizedStringKey.Title_HistoryOfToday:
      const dayDiff = args[0] as number
      
      if (dayDiff >= 2) {
        const date = args[1] as Date
        return localizedString(LocalizedStringKey.Title_HistoryFromDate).replace(
          /{date}/, 
          dateLocaleString(date, preferredLanguage)
        )
      } else if (dayDiff >= 1) {
        return localizedString(LocalizedStringKey.Title_HistoryOfYesterday)
      }
      break  
    case LocalizedStringKey.Text_NumResultsFor:
      const count = (args[1] as Array<unknown>).length
      
      return `${count} ${localizedString(LocalizedStringKey.Text_NumResultsFor)} "${args[0]}"`
  }
  
  return localizedString(key)
}

export const localizedStringForTermTag = (tag: TermTag): string => {
  const key = Object.values(LocalizedStringKey).find(v => v === tag) as (LocalizedStringKey | undefined)
  // console.log('tag localized string key', key)
  
  return key ? localizedString(key) : `#${tag}`
}
