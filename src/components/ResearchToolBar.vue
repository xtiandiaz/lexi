<script setup lang="ts">
import { computed } from 'vue'
import type { ResearchTool } from '@/models/tools';
import settingsStore from '@/stores/settings'
import { researchToolButtonVMs } from '@/view-models/vm-tools'
import Toolbar from '@/vueties/components/bars/VuetyToolbar.vue'

const settings = settingsStore()

const emits = defineEmits<{
  toolSelected: [tool: ResearchTool]
}>()

const toolButtonVMs = computed(() => researchToolButtonVMs(settings.currentLanguageSettings))
</script>

<template>
  <Toolbar 
    :buttonVMs="toolButtonVMs"
    @tool-selected="(tool) => emits('toolSelected', tool)"
  />
</template>

<style scoped lang="scss">
@use '@design-tokens/palette';

:deep(.vuety-icon-button) {
  &.define {
    @include palette.color-attribute('color', 'orange');
  }
  &.image-search {
    @include palette.color-attribute('color', 'mint');
  }
  &.translate {
    @include palette.color-attribute('color', 'sky-blue');
  }
  &.web-search {
    @include palette.color-attribute('color', 'blue');
  }
  &.wikipedia-search {
    @include palette.color-attribute('color', 'body');
  }
}
</style>
