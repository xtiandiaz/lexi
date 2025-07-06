<script setup lang="ts">
import { RawContent, type Term } from '@/models/content';
import { allResearchTools, type ResearchTool } from '@/models/tools';
import { launchResearchToolForTerm } from '@/services/tool-handler';
import FoldableFormRow from '@vueties/components/form/rows/VuetyFoldableFormRow.vue'
import ResearchToolBar from '@/components/ResearchToolbar.vue'

// import { inputMarkIcon, showsInputMarkValueForKind } from '@/view-models/vm-input'
// import SvgIcon from '@vueties/components/misc/VuetySvgIcon.vue'
// import { isCompletedTermPassed } from '@/utils/term.utils';

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
      <span class="subtitle">{{ RawContent.aliasesStringFromTerm(term) }}</span>
    </template>
    <template v-slot:foldable-content>
      <ResearchToolBar
        :tools="allResearchTools"
        :language="term.language"
        @tool-selected="(tool: ResearchTool) => launchResearchToolForTerm(tool, term)"
      />
    </template>
  </FoldableFormRow>
</template>

<style scoped lang="scss">
@use '@design-tokens/typography';
@use '@design-tokens/palette';

.row.foldable {
  position: relative;
  z-index: 1;
  
  &.unfolded {
    span.title {
      @extend .h6;
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
    @extend .caption;
    @include palette.color-attribute('color', 'tertiary-body');
  }
}

:deep(.vuety-toolbar) {
  flex: auto;
  gap: 0;
  justify-content: space-between;
  
  .vuety-icon-button .svg-icon {
    width: 1.75em;
  }
}
</style>
