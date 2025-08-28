import GameView from "@/views/GameView.vue"
import DailyHistoryView from "@/views/DailyHistoryView.vue"
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
        path: '/daily-history',
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
