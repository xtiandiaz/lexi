<script setup lang="ts">
import { computed } from 'vue'
import VuetyIconButton from '@vueties/components/buttons/VuetyIconButton.vue';
import { Icon } from '@/assets/design-tokens/iconography';

const { currentStep, stepCount } = defineProps<{
  currentStep: number
  stepCount: number
}>()

const emits = defineEmits<{
  goNext: [void]
  goPrevious: [void]
}>()

const canGoNext = computed(() => currentStep < stepCount)
const canGoPrevious = computed(() => currentStep > 1)
</script>

<template>
  <div id="exploration-controls">
    <VuetyIconButton
      :class="['filled', { disabled: !canGoPrevious}]"
      :icon="Icon.ArrowLeft"
      @click="emits('goPrevious')"
    />
    <div class="state">
      <strong>{{currentStep}}</strong> / {{stepCount}}
    </div>
    <VuetyIconButton
      :class="['filled', { disabled: !canGoNext}]"
      :icon="Icon.ArrowRight"
      @click="emits('goNext')"
    />
  </div>
</template>

<style scoped lang="scss">
#exploration-controls {
  align-items: center;
  display: flex;
  gap: 1rem;
}

.state {
  min-width: 60px;
  text-align: center;
}
</style>
