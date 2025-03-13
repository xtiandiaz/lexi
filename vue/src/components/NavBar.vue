<script setup lang="ts">
import settingsStore from '@/stores/settings'
import dailyHistoryStore from '@/stores/history'
import { type INavigationMap, SectionKey } from '@/models/navigation'
import router from '@/router'
import IconButton from './vueties/buttons/IconButton.vue'
import { ColorKey } from '@/assets/design-tokens/palette';

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
    <IconButton 
      v-for="(path, index) of map.leftHandPaths" 
      :key="index"
      :icon="path.iconKey"
      :color="ColorKey.Body"
      :annotation="pathLabel(path.sectionKey)"
      @click="onPathClicked(path.sectionKey)"
    />
    
    <div class="spacer"></div>
    <strong class="title">{{ map.title }}</strong>
    <div class="spacer"></div>
    
    <IconButton 
      v-for="(path, index) of map.rightHandPaths" 
      :key="index"
      :icon="path.iconKey"
      :color="ColorKey.Body"
      :annotation="pathLabel(path.sectionKey)"
      @click="onPathClicked(path.sectionKey)"
    />
    <!-- <button 
      class="iconized annotated" 
      v-for="(path, index) of map.rightHandPaths" :key="index"
      :disabled="!isPathEnabled(path.sectionKey)"
      @click="onPathClicked(path.sectionKey)"
    >
      <span class="icon" :class="path.iconKey"></span>
      <span class="annotation">{{ pathLabel(path.sectionKey) }}</span>
    </button> -->
  </nav>
</template>

<style scoped lang="scss">
@use './../assets/design-tokens/iconography';
</style>
