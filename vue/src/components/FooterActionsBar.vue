<script setup lang="ts">
import { settingsStore } from '../stores/settings'

const settings = settingsStore()

const emits = defineEmits<{
  resetActiveWord: [void: void]
}>()
</script>

<template>
  <div class="button-bar">
    <button class="iconized small" @click="emits('resetActiveWord')">
      <span class="icon reset"></span>
    </button>
    <!-- <button class="iconized small">
      <span class="icon settings"></span>
    </button> -->
  </div>
  <span class="settings-summary">Lang: {{ settings.$state.language }}</span>
  <!-- • Mode: {{ settings.$state.mode }} -->
</template>

<style scoped lang="scss">
@use './../assets/design-tokens/typography';
@use './../assets/design-tokens/iconography';
@use './../assets/design-tokens/palette';

button {
  &.iconized {
    font-size: 1em;
  }
}

.icon {
  &.reset {
    @include iconography.colored-icon-content-attribute('arrow-reset', 'secondary-body');
  }
  &.settings {
    @include iconography.colored-icon-content-attribute('gear', 'secondary-body');
  }
}

.settings-summary {
  @extend .caption, .all-caps;
  @include palette.color-attribute('color', 'tertiary-body');
  
}
</style>
