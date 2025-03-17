import { IconKey } from '@/assets/design-tokens/iconography'
import { localizedString } from '@/services/localization'
import { LocalizedStringKey } from './language'
import { BackwardNavigationBarItemKey, type INavigationBarItems, pushedViewNavigationBarItems } from '@/components/vueties/models'
import { type ComputedRef, computed } from 'vue'
import settingsStore from '@/stores/settings'
import dailyHistoryStore from '@/stores/history'

export enum SectionKey {
  Game = 'game',
  Settings = 'settings',
  DailyHistory = 'daily-history'
}

export const sectionTitle = (key: SectionKey): string | undefined => {
  switch (key) {
    case SectionKey.Settings:
      return localizedString(LocalizedStringKey.SettingsSectionTitle)!
    case SectionKey.DailyHistory:
      return localizedString(LocalizedStringKey.DailyHistorySectionTitle)!
    default:
      return undefined
  }
}

export const computedNavigationItems = (section: SectionKey): ComputedRef<INavigationBarItems<SectionKey | BackwardNavigationBarItemKey>> => {
  switch (section) {
    case SectionKey.Game:
      return computed(() => {
        const settings = settingsStore()
        const dailyHistory = dailyHistoryStore()
        
        return {
          leftBarItems: [
            { 
              key: SectionKey.Settings,
              icon: IconKey.Gear,
              isEnabled: false,
              label: settings.activeLanguage.toUpperCase()
            }
          ],
          rightBarItems: [
            {
              key: SectionKey.DailyHistory,
              icon: IconKey.History,
              isEnabled: dailyHistory.wordCount > 0,
              label: `${dailyHistory.wordCount}`
            }
          ]
        }
      })
    case SectionKey.Settings:
    case SectionKey.DailyHistory:
      return computed(() => pushedViewNavigationBarItems([], sectionTitle(section)))
  }
}
