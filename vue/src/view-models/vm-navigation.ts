import { type ComputedRef, computed } from 'vue'
import { Section, sectionTitle } from '@/models/navigation'
import { ReturnNavigationTarget, type NavigationBarVM, pushedViewNavigationBarItems } from '@/components/vueties/view-models'
import settingsStore from '@/stores/settings'
import historyStore from '@/stores/history'
import { Icon } from '@/assets/design-tokens/iconography'

export const computedNavigationBarVM = (section: Section): ComputedRef<NavigationBarVM<Section | ReturnNavigationTarget>> => {
  switch (section) {
    case Section.Game:
      return computed(() => {
        const settings = settingsStore()
        const history = historyStore()
        
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
              isEnabled: history.dailyCompletedTermsCount() > 0,
              label: `${history.daily.completedTerms.length}`
            }
          ]
        }
      })
    case Section.Settings:
    case Section.DailyHistory:
      return computed(() => pushedViewNavigationBarItems([], sectionTitle(section)))
  }
}
