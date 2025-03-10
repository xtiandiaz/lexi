import { IconKey } from '@/assets/design-tokens/iconography'
import { localizedString } from '@/services/localization'
import { LocalizedStringKey } from './language'

export enum SectionKey {
  Game = 'game',
  Settings = 'settings',
  DailyHistory = 'daily-history'
}

export interface INavigationPath {
  iconKey: IconKey
  sectionKey?: SectionKey
}

export interface INavigationMap {
  origin: SectionKey,
  leftHandPaths: INavigationPath[],
  rightHandPaths: INavigationPath[],
  title?: string
}

export function sectionTitle(key: SectionKey): string {
  switch (key) {
    case SectionKey.Settings:
      return localizedString(LocalizedStringKey.SettingsSectionTitle)!
    case SectionKey.DailyHistory:
      return localizedString(LocalizedStringKey.DailyHistorySectionTitle)!
    case SectionKey.Game:
      return 'Lexi';
  }
}

export function navigationMap(origin: SectionKey): INavigationMap {
  let leftHandPaths: INavigationPath[] = []
  let rightHandPaths: INavigationPath[] = []
  let title: string | undefined = sectionTitle(origin)
  
  switch (origin) {
    case SectionKey.Game:
      leftHandPaths = [{ iconKey: IconKey.Gear, sectionKey: SectionKey.Settings }]
      rightHandPaths = [{ iconKey: IconKey.History, sectionKey: SectionKey.DailyHistory }]
      title = undefined
      break
    case SectionKey.Settings:
    case SectionKey.DailyHistory:
      leftHandPaths = [{ iconKey: IconKey.ChevronLeft }]
      break
  }
  
  return {
    origin: origin,
    leftHandPaths: leftHandPaths,
    rightHandPaths: rightHandPaths,
    title: title
  }
}
