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

function sectionTitle(key: SectionKey): string | undefined {
  switch (key) {
    case SectionKey.Settings:
      return localizedString(LocalizedStringKey.SettingsSectionTitle)
    case SectionKey.DailyHistory:
      return localizedString(LocalizedStringKey.DailyHistorySectionTitle)
  }
}

export function navigationMap(origin: SectionKey): INavigationMap {
  let leftHandPaths: INavigationPath[] = []
  let rightHandPaths: INavigationPath[] = []
  
  switch (origin) {
    case SectionKey.Game:
      leftHandPaths = [{ iconKey: IconKey.Gear, sectionKey: SectionKey.Settings }]
      rightHandPaths = [{ iconKey: IconKey.History, sectionKey: SectionKey.DailyHistory }]
      break
    case SectionKey.Settings:
    case SectionKey.DailyHistory:
      rightHandPaths = [{ iconKey: IconKey.Xmark }]
      break
  }
  
  return {
    origin: origin,
    leftHandPaths: leftHandPaths,
    rightHandPaths: rightHandPaths,
    title: sectionTitle(origin)
  }
}
