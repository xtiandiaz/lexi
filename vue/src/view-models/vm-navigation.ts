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
          ]
        }
      })
    case Section.Settings:
    case Section.DailyHistory:
      return computed(() => pushedViewNavigationBarItems([], sectionTitle(section)))
  }
}
