<script setup lang="ts">
import { WordTool } from '@/models/tools'

const { tools } = defineProps<{
  tools: Map<WordTool, boolean>,
}>()

const emits = defineEmits<{
  toolSelected: [tool: WordTool]
}>()

function wordToolIconClass(tool: WordTool): string {
  switch (tool) {
    case WordTool.Define: return 'define'
    case WordTool.WikipediaSearch: return 'wikipedia-search'
    case WordTool.WebSearch: return 'web-search'
    case WordTool.ImageSearch: return 'image-search'
    case WordTool.Hint: return 'hint'
    case WordTool.Skip: return 'skip'
    case WordTool.Continue: return 'continue'
  }
}
</script>

<template>
  <div class="toolbar">
    <button 
      class="iconized" 
      v-for="(tool, index) of tools.entries()" 
      :key="index" 
      :disabled="!tool[1]"
      @click="emits('toolSelected', tool[0])"
    >
      <span class="icon" :class="wordToolIconClass(tool[0])"></span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '../../assets/design-tokens/iconography';

button.iconized {
  .icon {
    font-size: 1.5em;
    
    &.define {
      @include iconography.colored-icon-content-attribute('dictionary', 'mint');
    }
    &.wikipedia-search {
      @include iconography.colored-icon-content-attribute('wikipedia', 'body');
    }
    &.web-search {
      @include iconography.colored-icon-content-attribute('globe', 'blue');
    }
    &.image-search {
      @include iconography.colored-icon-content-attribute('image', 'indigo');
    }
    &.continue {
      @include iconography.colored-icon-content-attribute('play', 'purple');
    }
    &.hint {
      @include iconography.colored-icon-content-attribute('hint', 'yellow');
    }
    &.skip {
      @include iconography.colored-icon-content-attribute('skip', 'secondary-body');
    }
  }
}
</style>
