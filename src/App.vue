<script setup lang="ts">
import { ref, onMounted, watch, inject } from 'vue'
import { HashRouter } from './plugins/hash-router'
import sessionStore from '@/stores/session'
import { Section } from '@/models/navigation'
import { type Scene } from '@/models/scene'
import { GameMode } from '@/models/game'
import { trackColorSheme } from '@/composables/color-scheme'
import { hexString } from '@/assets/tungsten/stringify'
import { Color, schemeColor } from '@design-tokens/palette'
import { computedNavigationBarVM, sectionScene, sectionView } from "@/view-models/vm-navigation"
import HashRouterScene from './views/HashRouterScene.vue'
import HashRouterModalScene from './views/HashRouterModalScene.vue'
import NavigationBar from '@vueties/bars/NavigationBar.vue'

const hashRouter: HashRouter = inject('hash-router')!

const session = sessionStore()

const modalScene = ref<Scene<Section> | undefined>()

const currentColorScheme = trackColorSheme()
const navigationBarVM = computedNavigationBarVM(Section.Game)

function updateThemeColor() {
  const metaTag = document.getElementById('theme-color-meta-tag')
  const colorString = hexString(schemeColor(currentColorScheme.value, Color.Background))
  
  metaTag?.setAttribute('content', colorString)
}

function navigateToSection(section: Section) {
  modalScene.value = sectionScene(section)
}

function closeModalScene() {  
  modalScene.value = undefined
}

function cancelTest() {
  session.test = undefined
  
  onTestCancelledOrCompleted()
}

function onTestCancelledOrCompleted() {
  navigateToSection(Section.DailyHistory)
}

watch(() => currentColorScheme, () => {
  updateThemeColor()
})
watch(() => session.gameMode, (newMode) => {
  if (newMode === GameMode.Test) {
    closeModalScene()
  }
})

onMounted(() => {
  document.ondblclick = (e) => e.preventDefault()
  
  updateThemeColor()
})
</script>

<template>
  <NavigationBar 
    v-if="session.gameMode === GameMode.Exploration" 
    :vm="navigationBarVM" 
    @target-selected="navigateToSection"
  />
  
  <HashRouterScene 
    :route='hashRouter.currentRoute.value'
    
    @completed-test="onTestCancelledOrCompleted"
    @intended-to-cancel-test="cancelTest"
  />
  
  <!-- <GameView 
    @completed-test="onTestCancelledOrCompleted"
    @intended-to-cancel-test="cancelTest"
  /> -->
  
  <HashRouterModalScene 
    :scene="modalScene" 
    :view-factory="sectionView"
    @intended-to-close="closeModalScene" 
  />
</template>
