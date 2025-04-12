import { enumKeyFromValue } from '@/assets/tungsten/misc'

export enum Section {
  Game = 'game',
  Settings = 'settings',
  DailyHistory = 'daily-history'
}

export const sectionHashPath = (section: Section): string => `#/${section}`

export const sectionFromHashPath = (hashPath: string): Section | undefined => {
  return enumKeyFromValue(Section, hashPath.slice(2))
}
