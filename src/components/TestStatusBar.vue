<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Section } from '@/models/navigation'
import sessionStore from '@/stores/session'
import { Icon } from '@design-tokens/iconography'
import CloseButton from '@vueties/buttons/CloseButton.vue';
import ProgressBar from '@vueties/bars/ProgressBar.vue'

const router = useRouter()

const session = sessionStore()

const testProgress = computed(() => session.test?.progress ?? 0)

function cancelTest() {
  session.test = undefined
  
  router.push(Section.DailyHistory)
}
</script>

<template>
  <div class="item-bar status-bar">
    <ProgressBar :progress="testProgress" :iconFrom="Icon.Right" />
    <CloseButton :icon="Icon.Xmark" @click="cancelTest" />
  </div>
</template>

<style scoped lang="scss">
@use '@vueties/styles/bars';
@use '@design-tokens/palette';

.status-bar {
  height: bars.$nav-bar-height;
  left: 0;
  padding: bars.$nav-bar-padding;
  padding-left: 1em;
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
