import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import hashRouter from '@/plugins/hash-router'
import { Section } from '@/models/navigation'
import GameView from './views/GameView.vue'
import DailyHistoryView from './views/DailyHistoryView.vue'
import SettingsView from './views/SettingsView.vue'

const app = createApp(App)

app.use(createPinia())

app.use(hashRouter, {
  rootRouteKey: Section.Game,
  routes: [
    {
      key: Section.Game,
      view: GameView
    },
    {
      key: Section.DailyHistory,
      view: DailyHistoryView
    },
    {
      key: Section.Settings,
      view: SettingsView
    }
  ]
})

app.mount('#app')
