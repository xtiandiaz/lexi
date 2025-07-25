<script setup lang="ts">
import { RawContent, type Term } from '@/models/content';
import type { ResearchTool } from '@/models/tools';
import { launchResearchToolForTerm } from '@/services/tool-handler';
import ResearchToolBar from '@/components/ResearchToolbar.vue'
import FoldableFormRow from '@vueties/components/form/rows/VuetyFoldableFormRow.vue'
import { termResearchTools } from '@/utils/term.utils';

defineProps<{
  term: Term
  isUnfolded: boolean
}>()

const emits = defineEmits<{
  selected: [void]
}>()
</script>

<template>
  <FoldableFormRow 
    :is-unfolded="isUnfolded"
    @selected="emits('selected')"
    >
    <template v-slot:title>
      <slot name="background"></slot>
      
      <div class="title-wrapper">
        <span class="title">{{ term.word }}</span>
        
        <slot name="marks"></slot>
      </div>
    </template>
    <template v-slot:subtitle v-if="term.aliases">
      <span class="subtitle caption">{{ RawContent.aliasesStringFromTerm(term) }}</span>
    </template>
    <template v-slot:foldable-content>
      <ResearchToolBar
        :tools="termResearchTools(term)"
        :language="term.language"
        @tool-selected="(tool: ResearchTool) => launchResearchToolForTerm(tool, term)"
      />
    </template>
  </FoldableFormRow>
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;

.row.foldable {
  position: relative;
  z-index: 1;
  
  &.unfolded {
    .title {
      @include vs.h6();
    }
  }
  
  .title-wrapper {
    &, > * {
      align-items: center;
      display: flex;
      flex-direction: row;
      gap: 0.5em;
    }
  }
  
  .subtitle {
    @include vs.color-attribute('color', vs.$tertiary-body-color);
  }
}

:deep(.vuety-toolbar) {
  justify-content: space-evenly;
  width: 100%;
  
  .vuety-icon-button .svg-icon {
    @include vs.size(1.75em);
  }
}
</style>
