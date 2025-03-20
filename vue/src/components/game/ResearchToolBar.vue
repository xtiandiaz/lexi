<script setup lang="ts">
import type { ResearchTool } from '@/models/tools';
import settingsStore from '@/stores/settings'
import { researchToolButtonVMs } from '@/view-models/vm-tools'
import ToolBar from '@/components/vueties/bars/ToolBar.vue'

const settings = settingsStore()

const emits = defineEmits<{
  toolSelected: [tool: ResearchTool]
}>()
</script>

<template>
  <ToolBar 
    :buttonVMs="researchToolButtonVMs(settings.currentLanguageSettings.translationLanguage)"
    @tool-selected="(tool) => emits('toolSelected', tool)"
  />
</template>

<style scoped lang="scss">
@use '@/assets/design-tokens/palette';

:deep(.icon-button) {
  &.define {
    @include palette.color-attribute('color', 'orange');
  }
  &.image-search {
    @include palette.color-attribute('color', 'mint');
  }
  &.translate {
    @include palette.color-attribute('color', 'blue')
  }
  &.web-search {
    @include palette.color-attribute('color', 'purple');
  }
  &.wikipedia-search {
    @include palette.color-attribute('color', 'body');
  }
}
</style>
