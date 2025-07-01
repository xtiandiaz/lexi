<script setup lang="ts">
import { computed } from 'vue'
import sessionStore from '@/stores/session'
import { Icon } from '@design-tokens/iconography'
import CloseButton from '@vueties/components/buttons/VuetyCloseButton.vue'
import ProgressBar from '@vueties/components/bars/VuetyProgressBar.vue'

const emits = defineEmits<{
  intendedToCancel: [void]
}>()

const session = sessionStore()

const testProgress = computed(() => session.test?.progress ?? 0)
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
  // left: 0;
  padding: 0 vueties-bar-styles.$nav-bar-h-padding 0 1em;
  // position: absolute;
  // right: 0;
  // top: 0;
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
