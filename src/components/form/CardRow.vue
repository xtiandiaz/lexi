<script lang="ts" setup>
import type { Card } from '@/models/game';

defineProps<{
  card: Card
}>()
</script>

<template>
  <div class="card-form-row">
    <div class="face-contents front">
      {{ card.frontTerm.word }}
      <span v-if="card.frontTerm?.aliases" class="aliases">{{ card.frontTerm.aliases.join(', ') }}</span>
    </div>
    <div class="flex-spacer"></div>
    <div class="face-contents back">
      {{ card.backTerm?.word }}
      <span v-if="card.backTerm?.aliases" class="aliases">{{ card.backTerm.aliases.join(', ') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@vueties/utils/vuetystrap' as vs;
@use '@vueties/components/form/styles' as form-styles;

.card-form-row {
  @extend %form-row;
}

.face-contents {
  padding: 0.5rem 0;
  
  > * {
    display: block;
  }
  
  &.front {
    @include vs.color-attribute('color', vs.$tint-color);
    
    .aliases {
      opacity: 75%;
    }
  }
  
  &.back {
    text-align: right;
    
    .aliases {
      @include vs.color-attribute('color', vs.$tertiary-body-color);
    }
  }
  
  .aliases {
    @extend %caption;
  }
}
</style>
