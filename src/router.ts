import { Section } from "@/models/section"
import GameView from "@/views/GameView.vue"
import DailyHistoryView from "@/views/DailyHistoryView.vue"
import SettingsView from "@/views/SettingsView.vue"
import { createVuetyRouter } from "./vueties/router/vuety-router"

export default createVuetyRouter([
  {
    path: '/',
    components: {
      default: GameView
    },
    children: [
      {
        path: `/${Section.DailyHistory}`,
        components: {
          modal: DailyHistoryView
        },
      },
      {
        path: `/${Section.Settings}/:name?`,
        components: {
          modal: SettingsView
        }
      },
    ]
  }
])
