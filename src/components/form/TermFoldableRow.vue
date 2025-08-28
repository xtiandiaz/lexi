<script setup lang="ts">
import type { Term } from '@/models/content.models';
import type { AnyTool } from '@/models/tools';
import { launchResearchToolForTerm } from '@/services/tool-handler';
import ResearchToolbar from '@/components/TermToolbar.vue'
import FoldableFormRow from '@vueties/components/form/rows/VuetyFoldableFormRow.vue'
import { researchToolKeysInDisplayOrder, termMarkIcon } from '@/utils/game.utils';
import VuetySvgIcon from '@/vueties/components/misc/VuetySvgIcon.vue';

const { term } = defineProps<{
  isUnfolded: boolean
  term: Term
}>()

const emits = defineEmits<{
  select: [void]
}>()
</script>

<template>
  <FoldableFormRow 
    :is-unfolded="isUnfolded"
    @select="emits('select')"
  >
    <template #title>
      <!-- <div class="background"></div> -->
      
      <div class="title-wrapper">
        <span class="title">{{ term.word }}</span>
        
        <div v-if="term.marks.length > 0" class="marks">
          <span
            v-for="(mark, index) of term.marks.filter(m => m.value > 0)" 
            :class="['mark', mark.kind]"
            :key="index"
          >
            <span>{{ mark.value }} ×</span>
            <VuetySvgIcon :icon="termMarkIcon(mark.kind)" />
          </span>
        </div>
      </div>
    </template>
    
    <template v-slot:subtitle v-if="term.aliases">
      <span class="subtitle caption">{{ term.aliases.join(', ') }}</span>
    </template>
    
    <template #foldable-content>
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

.background {
  opacity: 10%;
  z-index: -1;
  @include vs.position(absolute, 0, 0, 0, 0);
  @include vs.color-attribute('background-color', 'green', 0.05);
}

.marks {
  gap: 0.25rem;

  .mark {
    @extend %caption;
    
    &.clue {
      @include vs.color-attribute('color', 'yellow');
    }
    &.test {
      @include vs.color-attribute('color', 'green');
    }
    
    > * {
      vertical-align: middle;
    }
    
    .svg-icon {
      height: 1.25rem;
      width: 1.25rem;
    }
  }
}

.vuety-foldable-form-row {
  position: relative;
  z-index: 1;
  
  &.unfolded {
    .title {
      @include vs.h6();
    }
  }
  
  .subtitle {
    @include vs.color-attribute('color', vs.$tertiary-body-color);
  }
  
  .title-wrapper {
    &, > * {
      align-items: center;
      display: flex;
      flex-direction: row;
      gap: 0.5em;
    }
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
