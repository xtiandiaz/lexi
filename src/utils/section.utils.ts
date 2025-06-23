import { Section } from '@/models/section'
import { LocalizedStringKey } from '@/models/localization'
import { localizedString } from "@/services/localization"
import { currentDailyHistoryTitle } from './history.utils'
import { enumKeyFromValue } from '@/assets/tungsten/enum'

export const sectionHashPath = (section: Section): string => `#/${section}`

export const sectionFromHashPath = (hashPath: string): Section | undefined => {
  return enumKeyFromValue(Section, hashPath.slice(2))
}

export const sectionTitle = (section: Section) => {
  switch (section) {
    case Section.DailyHistory:
      return currentDailyHistoryTitle()
    case Section.Search:
      return localizedString(LocalizedStringKey.Title_Search)
    case Section.Settings:
      return localizedString(LocalizedStringKey.Title_Settings)
    default:
      return "Demo"
  }
}
