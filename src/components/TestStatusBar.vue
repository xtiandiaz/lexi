<script setup lang="ts">
import { computed } from 'vue'
import sessionStore from '@/stores/session'
import { Icon } from '@design-tokens/iconography'
import CloseButton from '@vueties/buttons/CloseButton.vue';
import ProgressBar from '@vueties/bars/ProgressBar.vue'

const emits = defineEmits<{
  intendedToCancel: [void]
}>()

const session = sessionStore()

const testProgress = computed(() => session.test?.progress ?? 0)
</script>

<template>
  <div class="item-bar status-bar">
    <ProgressBar :progress="testProgress" :iconFrom="Icon.Right" />
    <CloseButton :icon="Icon.Xmark" @click="emits('intendedToCancel')" />
  </div>
</template>

<style scoped lang="scss">
@use '@vueties/styles/bars';
@use '@design-tokens/palette';

.status-bar {
  height: bars.$nav-bar-height;
  left: 0;
  padding: 0 bars.$nav-bar-h-padding 0 1em;
  position: absolute;
  right: 0;
  top: 0;
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
