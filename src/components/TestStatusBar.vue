<script setup lang="ts">
import { computed } from 'vue'
import useGameStore from '@/stores/game'
import { Icon } from '@design-tokens/iconography'
import CloseButton from '@vueties/components/buttons/VuetyCloseButton.vue'
import ProgressBar from '@vueties/components/bars/VuetyProgressBar.vue'

const emits = defineEmits<{
  intendedToCancel: [void]
}>()

const game = useGameStore()

const testProgress = computed(() => game.test?.progress ?? 0)
</script>

<template>
  <div class="item-bar status-bar">
    <ProgressBar :progress="testProgress" :iconFrom="Icon.CheckmarkCircle" />
    <CloseButton :icon="Icon.Xmark" @click="emits('intendedToCancel')" />
  </div>
</template>

<style scoped lang="scss">
@use '@vueties/components/bars/styles' as vueties-bar-styles;
@use '@design-tokens/palette';

.status-bar {
  height: vueties-bar-styles.$nav-bar-height;
  padding: 0 vueties-bar-styles.$nav-bar-h-padding 0 1em;
  z-index: 1000;
  
  .progress-bar {
    flex: auto;
    
    :deep(.bar .fill) {
      @include palette.color-attribute('background-color', 'green');
    }
    
    :deep(.svg-icon) {
      @include palette.color-attribute('color', 'green');
    }
  }
}
</style>
