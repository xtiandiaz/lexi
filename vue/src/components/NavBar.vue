<script setup lang="ts">
import settingsStore from '@/stores/settings'
import dailyHistoryStore from '@/stores/history'
import { type INavigationMap, SectionKey } from '@/models/navigation'
import router from '@/router'

const { map } = defineProps<{
  map: INavigationMap
}>()

const settings = settingsStore()
const dailyHistory = dailyHistoryStore()

function pathLabel(sectionKey?: SectionKey): string {
  switch (sectionKey) {
    case SectionKey.Settings:
      return settings.activeLanguage.toUpperCase()
    case SectionKey.DailyHistory:
      return `${dailyHistory.wordCount}`
    default:
      return 'Lexi'
  }
}

function isPathEnabled(sectionKey?: SectionKey): boolean {
  switch (sectionKey) {
    case SectionKey.DailyHistory:
      return dailyHistory.wordCount > 0
    case SectionKey.Settings:
      return false
    default:
      return true
  }
}

function onPathClicked(sectionKey?: SectionKey) {
  if (sectionKey !== undefined) {
    router.push(sectionKey)
  } else {
    router.back()
  }
}
</script>

<template>
  <nav>
    <button 
      class="iconized" 
      v-for="(path, index) of map.leftHandPaths" :key="index"
      :disabled="!isPathEnabled(path.sectionKey)"
      @click="onPathClicked(path.sectionKey)"
    >
      <span class="icon" :class="[path.sectionKey ?? 'back', path.sectionKey ? '' : 'small']"></span>
      <span :class="path.sectionKey === undefined ? 'label' : 'annotation'">{{ pathLabel(path.sectionKey) }}</span>
    </button>
    
    <div class="spacer"></div>
    <span class="title serif">{{ map.title }}</span>
    <div class="spacer"></div>
    
    <button 
      class="iconized" 
      v-for="(path, index) of map.rightHandPaths" :key="index"
      :disabled="!isPathEnabled(path.sectionKey)"
      @click="onPathClicked(path.sectionKey)"
    >
      <span class="annotation all-caps">{{ pathLabel(path.sectionKey) }}</span>
      <span class="icon" :class="path.sectionKey"></span>
    </button>
  </nav>
</template>

<style scoped lang="scss">
@use './../assets/design-tokens/iconography';

.icon {
  &.settings {
    @include iconography.colored-icon-content-attribute('gear', 'body');
  }
  &.daily-history {
    @include iconography.colored-icon-content-attribute('history', 'body');
  }
}
</style>
