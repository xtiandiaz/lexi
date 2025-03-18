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
      return localizedString(LocalizedString.SettingsSectionTitle)!
    case Section.DailyHistory:
      return localizedString(LocalizedString.DailyHistorySectionTitle)!
    default:
      return undefined
  }
}
