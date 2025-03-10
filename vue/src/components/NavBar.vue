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

function pathAnnotation(sectionKey?: SectionKey): string {
  switch (sectionKey) {
    case SectionKey.Settings:
      return settings.activeLanguage.toUpperCase()
    case SectionKey.DailyHistory:
      return `${dailyHistory.wordCount}`
    default:
      return ''
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
    <span class="annotated" v-for="(path, index) of map.leftHandPaths" :key="index">
      <button 
        class="iconized" 
        :disabled="!isPathEnabled(path.sectionKey)"
        @click="onPathClicked(path.sectionKey)"
      >
        <span class="icon" :class="path.sectionKey ?? 'back'"></span>
      </button>
      <span class="annotation">{{ pathAnnotation(path.sectionKey) }}</span>
    </span>
    
    <div class="spacer"></div>
    <span class="title serif">{{ map.title }}</span>
    <div class="spacer"></div>
    
    <span class="annotated" v-for="(path, index) of map.rightHandPaths" :key="index">
      <span class="annotation">{{ pathAnnotation(path.sectionKey) }}</span>
      <button 
        class="iconized" 
        :disabled="!isPathEnabled(path.sectionKey)"
        @click="onPathClicked(path.sectionKey)"
      >
        <span class="icon" :class="path.sectionKey ?? 'back'"></span>
      </button>
    </span>
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
  &.back {
    @include iconography.colored-icon-content-attribute('chevron-left', 'body');
  }
}
</style>
