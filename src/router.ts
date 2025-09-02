import GameView from "@/views/GameView.vue"
import DailyHistoryView from "@/views/DailySummaryView.vue"
import SettingsView from "@/views/SettingsView.vue"
import { createVuetyRouter } from "./vueties/router/vuety-router"

export default createVuetyRouter([
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
  },
])
