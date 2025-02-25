<script setup lang="ts">
import { settingsStore } from '../stores/settings'

const settings = settingsStore()
</script>

<template>
  <div class="button-bar">
    <button class="iconized small" @click="$emit('resetActiveWord')">
      <span class="icon reset"></span>
    </button>
    <button class="iconized small">
      <span class="icon settings"></span>
    </button>
  </div>
  <span class="caption all-caps">Mode: {{ settings.$state.mode }}</span>
</template>

<style scoped lang="scss">
@use './../assets/design-tokens/iconography';

button {
  &.iconized {
    font-size: 1em;
  }
}

.icon {
  &.reset {
    @include iconography.colored-icon-content-attribute('arrow-reload', 'secondary-body');
  }
  &.settings {
    @include iconography.colored-icon-content-attribute('gear', 'secondary-body');
  }
}
</style>
