import { type ComputedRef, computed } from 'vue'
import { Section, sectionTitle } from '@/models/navigation'
import { ReturnNavigationTarget, type NavigationBarVM, pushedViewNavigationBarItems } from '@/components/vueties/view-models'
import settingsStore from '@/stores/settings'
import dailyHistoryStore from '@/stores/history'
import { Icon } from '@/assets/design-tokens/iconography'

export const computedNavigationBarVM = (section: Section): ComputedRef<NavigationBarVM<Section | ReturnNavigationTarget>> => {
  switch (section) {
    case Section.Game:
      return computed(() => {
        const settings = settingsStore()
        const dailyHistory = dailyHistoryStore()
        
        return {
          leftBarItems: [
            { 
              target: Section.Settings,
              icon: Icon.Gear,
              isEnabled: false,
              label: settings.activeLanguage.toUpperCase()
            }
          ],
          rightBarItems: [
            {
              target: Section.DailyHistory,
              icon: Icon.History,
              isEnabled: dailyHistory.wordCount > 0,
              label: `${dailyHistory.wordCount}`
            }
          ]
        }
      })
    case Section.Settings:
    case Section.DailyHistory:
      return computed(() => pushedViewNavigationBarItems([], sectionTitle(section)))
  }
}
