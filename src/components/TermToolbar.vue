<script setup lang="ts">
import { computed } from 'vue'
import type { AnyTool } from '@/models/tools';
import { ToolKey } from '@/models/tools';
import type { Term } from '@/models/content.models';
import { canUseToolForTerm, produceToolsForTerm, toolIcon } from '@/utils/tool.utils';
import type { VuetyToolbarItem } from '@/vueties/components/shared/view-models';
import VuetyToolbar from '@vueties/components/bars/VuetyToolbar.vue'

const { toolKeys, term } = defineProps<{
  term: Term
  toolKeys: ToolKey[]
}>()

const emits = defineEmits<{
  useTool: [tool: AnyTool]
}>()

const tools = computed(() => produceToolsForTerm(toolKeys, term))
const toolbarItems = computed<VuetyToolbarItem<ToolKey>[]>(() => tools.value.map(tool => {
  return { 
    icon: toolIcon(tool), 
    isEnabled: canUseToolForTerm(tool, term), 
    key: tool.key 
  }
}))
</script>

<template>
  <VuetyToolbar 
    :items="toolbarItems"
    @setTool="(key) => emits('useTool', tools.find(t => t.key === key)!)"
  />
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@vueties/utils/vuetystrap' as vs;

:deep(.vuety-icon-button) {
  $tool-color-map: (
    ('clue' 'yellow'),
    ('define', 'orange'),
    ('image-search', 'mint'),
    ('translate', 'sky-blue'),
    ('web-search', 'blue'),
    ('wikipedia-search', 'body'),
  );
  
  @each $tool, $color in $tool-color-map {
    &.#{$tool} .svg-icon {
      @include vs.color-attribute('color', $color);
    }
  }
}
</style>
