<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import sessionStore from '@/stores/session'
import settingsStore from '@/stores/settings'
import historyStore from '@/stores/history'
import { Section } from '@/models/section'
import { GameMode } from '@/models/game'
import type { VuetyNavigationBarVM } from '@vueties/components/bars/view-models'
import VuetyScene from '@vueties/scenes/VuetyScene.vue'
import { Icon } from '@design-tokens/iconography'

const session = sessionStore()
const settings = settingsStore()
const history = historyStore()

const router = useRouter()

const navigationBarVM = computed<VuetyNavigationBarVM>(() => {
  return {
    isVisible: session.gameMode === GameMode.Exploration,
    leftBarItems: [
      {
        icon: Icon.Gear,
        isEnabled: true,
        label: settings.currentLanguage.toUpperCase(),
        path: `/${Section.Settings}`
      },
      {
        icon: Icon.MagnifyingGlass,
        isEnabled: session.inputState?.isComplete === true,
        path: `/${Section.Search}`
      }
    ],
    rightBarItems: [
      {
        icon: Icon.History,
        isEnabled: history.currentTermCount > 0,
        label: `${history.currentTermCount}`,
        path: `/${Section.DailyHistory}`
      }
    ]
  }
})

watch(() => session.gameMode, (newMode, oldMode) => {
  if (newMode === GameMode.Test) {
    router.replace('/')
  } else if (oldMode === GameMode.Test) {
    router.replace(`/${Section.DailyHistory}`)
  }
})

onMounted(() => {
  document.ondblclick = (e) => e.preventDefault()
})
</script>

<template>
  <VuetyScene :navigationBarVM="navigationBarVM" />
</template>
