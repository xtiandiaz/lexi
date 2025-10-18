<script setup lang="ts">
import { computed } from 'vue'
import VuetyIconButton from '@vueties/components/buttons/VuetyIconButton.vue';
import { Icon } from '@/assets/design-tokens/iconography';
import { useEvents } from '@/vueties/composables/events';

const { currentStep, stepCount } = defineProps<{
  currentStep: number
  stepCount: number
}>()

const emits = defineEmits<{
  next: [void]
  previous: [void]
}>()

const canGoNext = computed(() => currentStep < stepCount)
const canGoPrevious = computed(() => currentStep > 1)

useEvents(['keydown'], window, (e) => {
  switch ((e as KeyboardEvent).code) {
    case 'ArrowLeft': 
      emits('previous')
      break
    case 'ArrowRight': 
      emits('next')
      break
  }
})
</script>

<template>
  <div id="exploration-controls">
    <VuetyIconButton
      :class="['filled', { disabled: !canGoPrevious}]"
      :icon="Icon.ArrowLeft"
      @click="emits('previous')"
    />
    <div class="state">
      {{currentStep}} / {{stepCount}}
    </div>
    <VuetyIconButton
      :class="['filled', { disabled: !canGoNext}]"
      :icon="Icon.ArrowRight"
      @click="emits('next')"
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
