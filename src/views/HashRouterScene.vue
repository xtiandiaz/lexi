<script setup lang="ts">
import { computed, inject } from 'vue'
import { HashRoutePresentationStyle, type HashRouter } from '@/plugins/hash-router'
import HashRouterModalScene from './HashRouterModalScene.vue'
import type { NavigationBarVM } from '@vueties/view-models'
import NavigationBar from '@vueties/bars/NavigationBar.vue'

defineProps<{
  navigationBarVM: NavigationBarVM
}>()

const hashRouter = inject('hash-router') as HashRouter | undefined
const currentBaseRoute = computed(() => hashRouter?.currentRoute.value.presentationStyle === undefined ? hashRouter?.currentRoute.value : undefined)
const currentModalRoute = computed(() => hashRouter?.currentRoute.value.presentationStyle === HashRoutePresentationStyle.Modal ? hashRouter?.currentRoute.value : undefined)

function navigateToRoute(key: string) {
  hashRouter?.pushRoute(key)
}
</script>

<template>
  <NavigationBar 
    v-if="navigationBarVM.isVisible" 
    :vm="navigationBarVM" 
    @route-selected="navigateToRoute"
  />
  
  <component :is="currentBaseRoute?.view" />
  
  <HashRouterModalScene 
    :route="currentModalRoute"
  />
</template>

<style scoped lang="scss">
</style>
