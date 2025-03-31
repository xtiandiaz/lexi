import { LocalizedString } from './language'
import { localizedString } from '@/services/localization'

export enum Section {
  Game = 'game',
  Settings = 'settings',
  DailyHistory = 'daily-history'
}

export const sectionTitle = (section: Section): string | undefined => {
  switch (section) {
    case Section.Settings:
      return localizedString(LocalizedString.Title_Settings)!
    case Section.DailyHistory:
      return localizedString(LocalizedString.Title_DailyHistory)!
    default:
      return undefined
  }
}
