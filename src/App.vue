<script setup lang="ts">
import { computed, onMounted, watch, inject } from 'vue'
import sessionStore from '@/stores/session'
import settingsStore from '@/stores/settings'
import historyStore from '@/stores/history'
import { Section } from '@/models/section'
import { GameMode } from '@/models/game'
import { trackColorSheme } from '@/composables/color-scheme'
import type { VuetyHashRouter } from '@vueties/plugins/hash-router/models'
import type { VuetyNavigationBarVM } from '@vueties/components/bars/view-models'
import { Color, schemeColor } from '@design-tokens/palette'
import { Icon } from '@design-tokens/iconography'
import HashRouterScene from '@vueties/plugins/hash-router/scenes/VuetyHashRouterScene.vue'
import { hexString } from '@/assets/tungsten/stringify'

const hashRouter: VuetyHashRouter = inject('vuety-hash-router')!

const session = sessionStore()
const settings = settingsStore()
const history = historyStore()

const currentColorScheme = trackColorSheme()
const navigationBarVM = computed<VuetyNavigationBarVM>(() => {
  return {
    isVisible: session.gameMode === GameMode.Exploration,
    leftBarItems: [
      { 
        icon: Icon.Gear,
        isEnabled: true,
        routeKey: Section.Settings,
        label: settings.currentLanguage.toUpperCase()
      }
    ],
    rightBarItems: [
      {
        icon: Icon.History,
        isEnabled: history.currentTermCount > 0,
        routeKey: Section.DailyHistory,
        label: `${history.currentTermCount}`
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
    hashRouter.setPath('/')
  } else if (oldMode === GameMode.Test) {
    hashRouter.pushRoute(Section.DailyHistory)
  }
})

onMounted(() => {
  document.ondblclick = (e) => e.preventDefault()
  
  updateThemeColor()
})
</script>

<template>  
  <HashRouterScene
    :navigationBarVM="navigationBarVM"
  />
</template>
