<script setup lang="ts" generic="Key">
import { type Component, computed } from 'vue';
import type { Scene } from '@/models/scene';
import ModalView from '@vueties/views/ModalView.vue'

const { scene, viewFactory } = defineProps<{
  scene?: Scene<Key>,
  viewFactory: (key: Key) => Component | undefined
}>()

const emits = defineEmits<{
  intendedToClose: [Key]
}>()

const view = computed(() => scene ? viewFactory(scene.key) : undefined)
</script>

<template>
  <Transition>
    <ModalView 
      v-if="scene"
      :title="scene.title"
      @close-button-clicked="emits('intendedToClose', scene.key)"
    >
      <component :is="view"></component>
    </ModalView>
  </Transition>
</template>

<style scoped lang="scss">
$transition-duration: 0.25s;
$transition-timing-function: ease-in;

@mixin transition($timing-function, $duration: 0.25s) {
  transition: none $duration $timing-function;
  
  :deep(.background) {
    transition: opacity $duration $timing-function;
  }
  :deep(.view-wrapper) {
    transition: transform $duration $timing-function;
  }
}

.v-enter-active {
  @include transition(ease-out);
}
.v-leave-active {
  @include transition(ease-in);
}
.v-enter-from, .v-leave-to {
  :deep(.background) {
    opacity: 0;
  }
  :deep(.view-wrapper) {
    transform: translateY(100%);
  }
}
</style>
