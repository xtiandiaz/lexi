<script setup lang="ts">
import { settingsStore } from '@/stores/settings';
import { historyStore } from '@/stores/history';

const settings = settingsStore()
const history = historyStore()
</script>

<template>
  <nav>
    <span class="annotated">
      <button class="iconized" :disabled="true">
        <span class="icon settings"></span>
      </button>
      <span class="annotation">{{ settings.activeLanguage.toUpperCase() }}</span>
    </span>
    <div class="spacer"></div>
    <span class="annotated">
      <span class="annotation">{{ history.words.length }}</span>
      <button class="iconized" :disabled="history.words.length === 0">
        <span class="icon history"></span>
      </button>
    </span>
  </nav>
</template>

<style scoped lang="scss">
@use './../assets/design-tokens/iconography';

.icon {
  &.settings {
    @include iconography.colored-icon-content-attribute('gear', 'body');
  }
  &.history {
    @include iconography.colored-icon-content-attribute('history', 'body');
  }
}
</style>
