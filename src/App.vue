<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import sessionStore from '@/stores/session'
import settingsStore from '@/stores/settings'
import historyStore from '@/stores/history'
import { Section } from '@/models/section'
import { GameMode } from '@/models/game'
import { trackColorSheme } from '@/composables/color-scheme'
import type { VuetyNavigationBarVM } from '@vueties/components/bars/view-models'
import { Color, schemeColor } from '@design-tokens/palette'
import { Icon } from '@design-tokens/iconography'
import { hexString } from '@/assets/tungsten/stringify'
import VuetyNavigationBar from './vueties/components/bars/VuetyNavigationBar.vue'

const session = sessionStore()
const settings = settingsStore()
const history = historyStore()

const router = useRouter()

const currentColorScheme = trackColorSheme()
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
        isEnabled: true,
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

function updateThemeColor() {
  const metaTag = document.getElementById('theme-color-meta-tag')

  const colorString = hexString(schemeColor(currentColorScheme.value, Color.Background))
  
  metaTag?.setAttribute('content', colorString)
}

watch(() => currentColorScheme, () => {
  updateThemeColor()
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
  
  updateThemeColor()
})
</script>

<template>
  <VuetyNavigationBar :viewModel="navigationBarVM" />
  
  <RouterView />
</template>
