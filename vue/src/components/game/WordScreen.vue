<script setup lang="ts">
defineProps<{
  input: string,
  // synonyms: string[],
  isWordCompleted: boolean
}>()
</script>

<template>
  <section id="screen">
    <div class="spacer"></div>
    <h1 class="serif">{{ input }}</h1>
    <!-- <h6 class="serif" v-if="isWordCompleted && synonyms.length > 0">{{ synonyms.join(', ') }}</h6> -->
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/design-tokens/palette";

.caption.all-caps {
  @include palette.color-attribute('color', 'tertiary-body');
}
</style>
