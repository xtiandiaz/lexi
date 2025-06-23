import { type Ref } from 'vue'
import { createWebHashHistory, createRouter } from "vue-router"
import { Section } from "@/models/section"
import GameView from "@/views/GameView.vue"
import DailyHistoryView from "@/views/DailyHistoryView.vue"
import SettingsView from "@/views/SettingsView.vue"
import SearchTermView from "./views/SearchTermView.vue"

declare module 'vue-router' {
  interface RouteMeta {
    section: Section
    title?: Ref<string | undefined>
  }
}

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: GameView,
      name: Section.Game,
      meta: {
        section: Section.Game
      },
      children: [
        {
          path: `/${Section.DailyHistory}`,
          name: Section.DailyHistory,
          components: {
            modal: DailyHistoryView
          },
          meta: {
            section: Section.DailyHistory
          }
        },
        {
          path: `/${Section.Search}/:term?`,
          name: Section.Search,
          components: {
            modal: SearchTermView
          },
          meta: {
            section: Section.Search,
          },
          props: {
            modal: true
          }
        },
        { 
          path: `/${Section.Settings}`,
          components: {
            modal: SettingsView
          },
          meta: {
            section: Section.Settings
          }
        },  
      ]
    },
  ]
})
