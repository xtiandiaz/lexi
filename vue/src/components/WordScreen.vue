<script setup lang="ts">
import { settingsStore } from '@/stores/settings';

defineProps<{
  input: string,
  synonyms: string[],
  isWordCompleted: boolean
}>()

const settings = settingsStore()
</script>

<template>
  <div id="screen" class="panel">
    <span class="caption all-caps">{{ settings.activeLanguage.toUpperCase() }}</span>
    <div class="fill"></div>
    <h1 class="serif">{{ input }}</h1>
    <h6 class="serif" v-if="isWordCompleted && synonyms.length > 0">{{ synonyms.join(', ') }}</h6>
  </div>
</template>

<style scoped lang="scss">
@use "./../assets/design-tokens/palette";

.caption.all-caps {
  @include palette.color-attribute('color', 'tertiary-body');
}
</style>
