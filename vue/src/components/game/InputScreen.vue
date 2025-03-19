<script setup lang="ts">
import { type InputState } from '@/models/input'

defineProps<{
  state: InputState
}>()
</script>

<template>
  <section id="screen">
    <div class="spacer"></div>
    <h1 class="serif">{{ state.prefixedInputString }}</h1>
    <h6 class="serif" v-if="state.isComplete && state.source.linkedWords.length > 0">
      {{ state.source.linkedWords.join(', ') }}
    </h6>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/design-tokens/palette";

h6 {
  @include palette.color-attribute('color', 'tertiary-body');
}
</style>
