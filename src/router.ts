import { createRouter, createWebHashHistory } from "vue-router"
// import GameView from "@/views/GameView.vue"
import DailyHistoryView from "@/views/DailySummaryView.vue"
import SettingsView from "@/views/SettingsView.vue"
import HomeView from "./views/HomeView.vue"
import DeckView from "./views/DeckView.vue"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomeView
      },
      children: [
        {
          path: '/daily-summary',
          components: {
            modal: DailyHistoryView
          },
        },
        {
          path: '/settings',
          components: {
            modal: SettingsView
          }
        },
      ]
    },
    {
      path: '/deck/:_key',
      components: {
        default: DeckView
      },
      props: true
    }
  ],
})
