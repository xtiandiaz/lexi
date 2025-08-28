<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Term } from '@/models/content.models';
import type { AnyTool } from '@/models/tools';
import TermSlide from './TermCard.vue';

const { index } = defineProps<{
  currentTerm: Term,
  index: number
}>()

const emits = defineEmits<{
  useTool: [tool: AnyTool]
}>()

enum TransitionDirection { Forward, Backward }
const transitionDirection = ref<TransitionDirection>(TransitionDirection.Forward)

watch(() => index, (newIndex, oldIndex) => {
   transitionDirection.value = newIndex > oldIndex ? TransitionDirection.Forward : TransitionDirection.Backward
})
</script>

<template>
  <Transition appear :name="transitionDirection === TransitionDirection.Forward ? 'next' : 'previous'">
    <TermSlide 
      v-if="currentTerm"
      :key="currentTerm.id"
      :term="currentTerm" 
      @useTool="(tool) => emits('useTool', tool)"
    />
  </Transition>  
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;

.term-slide-wrapper {
  height: 75vw;
  transform: translate(-50%, -50%);
  transform-origin: 0 0;
  width: calc(100% - 1.5rem);
  @include vs.position(absolute, 40%, null, null, 50%);
}

.previous-enter-active,
.previous-leave-active,
.next-enter-active,
.next-leave-active {
  transition: all 0.5s ease;
}

.previous-leave-to,
.next-enter-from {
  left: 150%;
  transform: rotate(15deg) translate(-50%, -50%);
}

.previous-enter-from,
.next-leave-to {
  left: -50%;
  transform: rotate(-15deg) translate(-50%, -50%);
}
.next-leave-to, 
.previous-leave-to {
  opacity: 0;
}
</style>
