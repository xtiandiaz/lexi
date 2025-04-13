import { createRouter, createWebHistory } from 'vue-router'
import { Section } from '@/models/navigation'
import GameView from '@/views/GameView.vue'
import DailyHistoryView from '@/views/DailyHistoryView.vue'
import SettingsView from '@/views/SettingsView.vue'

function component(section: Section) {
  switch (section) {
    case Section.DailyHistory:
      return DailyHistoryView
    case Section.Settings:
      return SettingsView
  }
}

// export default createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'lexi',
//       component: GameView,
//     }
//   ].concat(
//     [
//       Section.Settings, 
//       Section.DailyHistory
//     ].map(section => {
//       return {
//         path: `/${section}`,
//         name: section,
//         component: component(section)!
//       }
//     })
//   )
// })
