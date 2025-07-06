<script setup lang="ts">
import { computed } from 'vue'
import type { ResearchTool } from '@/models/tools';
import type { Language } from '@/models/localization';
import settingsStore from '@/stores/settings'
import { produceResearchButtonVMsForLanguageSettings } from '@/view-models/vm-tools'
import Toolbar from '@/vueties/components/bars/VuetyToolbar.vue'

const { tools, language } = defineProps<{
  tools: ResearchTool[],
  language: Language
}>()

const emits = defineEmits<{
  toolSelected: [tool: ResearchTool]
}>()

const settings = settingsStore()

const toolButtonVMs = computed(
  () => produceResearchButtonVMsForLanguageSettings(tools, settings.getSettingsForLanguage(language))
)
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
