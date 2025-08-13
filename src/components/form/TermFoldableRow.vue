<script setup lang="ts">
import type { Term } from '@/models/content.models';
import type { AnyTool } from '@/models/tools';
import { launchResearchToolForTerm } from '@/services/tool-handler';
import ResearchToolbar from '@/components/TermToolbar.vue'
import FoldableFormRow from '@vueties/components/form/rows/VuetyFoldableFormRow.vue'
import { researchToolKeysInDisplayOrder } from '@/utils/game.utils';

defineProps<{
  isUnfolded: boolean
  term: Term
}>()

const emits = defineEmits<{
  select: [void]
}>()
</script>

<template>
  <FoldableFormRow 
    :isUnfolded="isUnfolded"
    @select="emits('select')"
  >
    <template v-slot:title>
      <slot name="background"></slot>
      
      <div class="title-wrapper">
        <span class="title">{{ term.word }}</span>
        
        <slot name="marks"></slot>
      </div>
    </template>
    
    <template v-slot:subtitle v-if="term.aliases">
      <span class="subtitle caption">{{ term.aliases.join(', ') }}</span>
    </template>
    
    <template v-slot:foldable-content>
      <ResearchToolbar
        :term="term"
        :toolKeys="researchToolKeysInDisplayOrder"
        @setTool="(tool: AnyTool) => launchResearchToolForTerm(tool, term)"
      />
    </template>
  </FoldableFormRow>
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;

.vuety-foldable-form-row {
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
