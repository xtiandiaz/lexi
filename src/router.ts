import { createRouter, createWebHashHistory } from "vue-router"
import GameView from "@/views/GameView.vue"
import DailyHistoryView from "@/views/DailySummaryView.vue"
import SettingsView from "@/views/SettingsView.vue"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'game',
      components: {
        default: GameView
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
    }
  ],
})
