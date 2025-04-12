import { type ComputedRef, computed } from 'vue'
import { Section, sectionFromHashPath } from '@/models/navigation'
import { LocalizedStringKey } from '@/models/localization'
import settingsStore from '@/stores/settings'
import historyStore from '@/stores/history'
import { localizedString } from '@/services/localization'
import { Icon } from '@/assets/design-tokens/iconography'
import { type NavigationBarVM, pushedViewNavigationBarItems } from '@vueties/view-models'
import DailyHistoryView from '@/views/DailyHistoryView.vue'
import SettingsView from '@/views/SettingsView.vue'

export const sectionView = (section: Section) => {
  switch (section) {
    case Section.DailyHistory: return DailyHistoryView
    case Section.Settings: return SettingsView
    default: return undefined
  }
}

export const sectionViewFromHashPath = (hashPath: string) => {
  const section = sectionFromHashPath(hashPath)
  
  return section ? sectionView(section) : undefined
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

export const sectionTitleFromHashPath = (hashPath: string) => {
  const section = sectionFromHashPath(hashPath)
  
  return section ? sectionTitle(section) : undefined
}

export const computedNavigationBarVM = (section: Section): ComputedRef<NavigationBarVM<Section>> => {
  switch (section) {
    case Section.Game:
      return computed(() => {
        const settings = settingsStore()
        const history = historyStore()
        
        const dailyCompletedTermCount = computed(() => history.currentDailyHistory?.completedTerms.length ?? 0)
        
        return {
          leftBarItems: [
            { 
              target: Section.Settings,
              icon: Icon.Gear,
              isEnabled: true,
              label: settings.currentLanguage.toUpperCase()
            }
          ],
          rightBarItems: [
            {
              target: Section.DailyHistory,
              icon: Icon.History,
              isEnabled: dailyCompletedTermCount.value > 0,
              label: `${dailyCompletedTermCount.value}`
            }
          ],
        }
      })
    case Section.Settings:
    case Section.DailyHistory:
      return computed(() => pushedViewNavigationBarItems([], sectionTitle(section)))
  }
}
