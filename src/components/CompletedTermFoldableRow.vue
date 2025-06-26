<script setup lang="ts">
import { type CompletedTerm } from '@/models/history';
import { inputMarkIcon, showsInputMarkValueForKind } from '@/view-models/vm-input'
import TermFoldableRow from './TermFoldableRow.vue';
import SvgIcon from '@vueties/components/misc/VuetySvgIcon.vue'
import { isCompletedTermPassed } from '@/utils/term.utils';

defineProps<{
  term: CompletedTerm
  isUnfolded: boolean
}>()

const emits = defineEmits<{
  selected: [void]
}>()
</script>

<template>
  <TermFoldableRow
    :term="term"
    :isUnfolded="isUnfolded"
    @selected="emits('selected')"
  >
    <template #background>
      <div v-if="isCompletedTermPassed(term)" class="term-passed-background"></div>
    </template>
    
    <template #marks>
      <div v-if="term.inputMarks && term.inputMarks.length > 0" class="input-marks">
        <span
          v-for="(mark, index) of term.inputMarks.filter(m => m.value > 0)" 
          :key="index"
          class="mark" :class="mark.kind"
        >
          <span v-if="showsInputMarkValueForKind(mark.kind)">{{ mark.value }} ×</span>
          <SvgIcon :icon="inputMarkIcon(mark.kind)" />
        </span>
      </div>
    </template>
  </TermFoldableRow>
</template>

<style scoped lang="scss">
@use '@design-tokens/typography';
@use '@design-tokens/palette';

.input-marks {
  gap: 0.25em;

  span.mark {
    @extend .caption;
    
    &.hint {
      @include palette.color-attribute('color', 'yellow');
    }
    &.test {
      @include palette.color-attribute('color', 'green');
    }
    
    > * {
      vertical-align: middle;
    }
    
    .svg-icon {
      height: 1.25em;
      width: 1.25em;
    }
  }
}

.term-passed-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
  @include palette.color-attribute('background-color', 'green', 0.05);
}
</style>
