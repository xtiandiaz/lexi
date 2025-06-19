import { createWebHashHistory, createRouter } from "vue-router";
import { Section } from "@/models/section"
import GameView from "@/views/GameView.vue"
import DailyHistoryView from "@/views/DailyHistoryView.vue"
import SettingsView from "@/views/SettingsView.vue"
import { sectionTitle } from "@/utils/section.utils"

declare module 'vue-router' {
  interface RouteMeta {
    section: Section
    title?: string
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: GameView,
      meta: {
        section: Section.Game
      },
      children: [
        {
          path: Section.DailyHistory,
          components: {
            modal: DailyHistoryView
          },
          meta: {
            section: Section.DailyHistory
          }
        },
        { 
          path: 'settings', 
          components: {
            modal: SettingsView
          },
          meta: {
            section: Section.Settings
          }
        },
      ]
    }
  ]
})

router.beforeEach((to) => {
  to.meta.title = sectionTitle(to.meta.section)
})

export default router
