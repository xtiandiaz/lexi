<script setup lang="ts">
import { ToolKey, type ITool } from '@/models/tools'
import IconButton from '../vueties/buttons/IconButton.vue'

const { tools } = defineProps<{
  tools: ITool[],
}>()

const emits = defineEmits<{
  toolSelected: [key: ToolKey]
}>()
</script>

<template>
  <div class="toolbar">
    <IconButton
      v-for="(tool, index) of tools" 
      :key="index" 
      :icon="tool.icon"
      :class="tool.key"
      :disabled="!tool.isEnabled"
      @click="emits('toolSelected', tool.key)"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/design-tokens/palette';

.define {
  @include palette.color-attribute('color', 'mint');
}
.continue {
  @include palette.color-attribute('color', 'purple');
}
.hint {
  @include palette.color-attribute('color', 'yellow');
}
.image-search {
  @include palette.color-attribute('color', 'indigo');
}
.web-search {
  @include palette.color-attribute('color', 'blue');
}
.wikipedia-search {
  @include palette.color-attribute('color', 'body');
}
</style>
