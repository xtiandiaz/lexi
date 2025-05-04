import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import hashRouter from './hash-router/plugin'
import { HashRoutePresentationStyle } from './hash-router/models'
import { Section } from '@/models/section'
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
      view: GameView,
      path: '/',
    },
    {
      key: Section.DailyHistory,
      view: DailyHistoryView,
      presentationStyle: HashRoutePresentationStyle.Modal
    },
    {
      key: Section.Settings,
      view: SettingsView,
      presentationStyle: HashRoutePresentationStyle.Modal
    }
  ]
})

app.mount('#app')
