import { Section } from '@/models/section'
import { LocalizedStringKey } from '@/models/localization'
import { localizedString } from "@/services/localization"
import { enumKeyFromValue } from '@/assets/tungsten/enum'

export const sectionHashPath = (section: Section): string => `#/${section}`

export const sectionFromHashPath = (hashPath: string): Section | undefined => {
  return enumKeyFromValue(Section, hashPath.slice(2))
}

export const sectionTitle = (section: Section) => {
  switch (section) {
    case Section.Settings:
      return localizedString(LocalizedStringKey.Title_Settings)!
    case Section.DailyHistory:
      return localizedString(LocalizedStringKey.Title_DailyHistory)!
    default:
      return undefined
  }
}
