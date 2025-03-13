<script setup lang="ts">
import { WordToolKey, type IWordTool } from '@/models/tools'
import IconButton from '../vueties/buttons/IconButton.vue'

const { tools } = defineProps<{
  tools: IWordTool[],
}>()

const emits = defineEmits<{
  toolSelected: [key: WordToolKey]
}>()
</script>

<template>
  <div class="toolbar">
    <IconButton
      v-for="(tool, index) of tools" 
      :key="index" 
      :icon="tool.icon"
      :color="tool.color"
      :disabled="!tool.isEnabled"
      @click="emits('toolSelected', tool.key)"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
