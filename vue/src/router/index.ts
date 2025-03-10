import { createRouter, createWebHistory } from 'vue-router'
import { SectionKey } from '@/models/navigation'
import GameView from '@/views/GameView.vue'
import DailyHistoryView from '@/views/DailyHistoryView.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'lexi',
      component: GameView,
    },
    {
      path: `/${SectionKey.DailyHistory}`,
      name: SectionKey.DailyHistory,
      component: DailyHistoryView,
    },
  ],
})
