import { createWebHashHistory, createRouter } from "vue-router"
import { Section } from "@/models/section"
import GameView from "@/views/GameView.vue"
import DailyHistoryView from "@/views/DailyHistoryView.vue"
import SettingsView from "@/views/SettingsView.vue"
import SearchTermsView from "./views/SearchTermsView.vue"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: GameView,
      name: Section.Game,
      children: [
        {
          path: `/${Section.DailyHistory}`,
          name: Section.DailyHistory,
          components: {
            modal: DailyHistoryView
          },
        },
        {
          path: `/${Section.Search}`,
          name: Section.Search,
          components: {
            modal: SearchTermsView
          },
        },
        {
          path: `/${Section.Settings}`,
          components: {
            modal: SettingsView
          },
        },  
      ]
    },
  ]
})
