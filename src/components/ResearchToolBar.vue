<script setup lang="ts">
import { computed } from 'vue'
import type { AnyTool, ToolKey } from '@/models/tools';
import type { Term } from '@/models/content';
import { produceToolsForTerm, toolIcon } from '@/utils/tool.utils';
import type { VuetyToolbarItem } from '@vueties/components/shared.vm';
import VuetyToolbar from '@vueties/components/bars/VuetyToolbar.vue'

const { toolKeys, term } = defineProps<{
  term: Term
  toolKeys: ToolKey[]
}>()

const emits = defineEmits<{
  setTool: [tool: AnyTool]
}>()

const tools = computed(() => produceToolsForTerm(toolKeys, term))
const items = computed<VuetyToolbarItem<ToolKey>[]>(() => tools.value.map(tool => {
  return { icon: toolIcon(tool), key: tool.key }
}))
</script>

<template>
  <VuetyToolbar 
    :items="items"
    @setTool="(key) => emits('setTool', tools.find(t => t.key === key)!)"
  />
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@design-tokens/palette';

:deep(.vuety-icon-button) {
  $tool-color-map: (
    ('define', 'orange'),
    ('image-search', 'mint'),
    ('translate', 'sky-blue'),
    ('web-search', 'blue'),
    ('wikipedia-search', 'body'),
  );
  
  @each $tool, $color in $tool-color-map {
    &.#{$tool} .svg-icon {
      @include palette.color-attribute('color', $color);
    }
  }
}
</style>
