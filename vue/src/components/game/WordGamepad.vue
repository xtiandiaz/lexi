<script setup lang="ts">
import { computed } from 'vue'
import { WordToolKey, type IWordTool } from '@/models/tools'
import type { IKeypadKey } from '../vueties/models';
import { IconKey } from '@/assets/design-tokens/iconography'
import SimpleKeypad from '../vueties/pads/SimpleKeypad.vue';
import ToolBar from '../vueties/bars/ToolBar.vue'

const { word, inputableLetterIndices, inputLetterIndices, tools } = defineProps<{
  word: string,
  inputableLetterIndices: number[],
  inputLetterIndices: number[],
  tools: IWordTool[]
}>()

const emits = defineEmits<{
  input: [index: number],
  toolSelected: [key: WordToolKey]
}>()

const keypadKeys = computed<IKeypadKey[]>(() => {
  const keys: IKeypadKey[] = inputableLetterIndices.map(li => {
    return { label: word[li].toLowerCase(), value: li, isEnabled: !inputLetterIndices.contains(li) }
  })
  keys.push({ label: IconKey.Delete, value: -1, isEnabled: inputLetterIndices.length !== 0 })
  return keys
})
const isWordSolved = computed(() => tools.map(t => t.key).contains(WordToolKey.Continue))
</script>

<template>
  <section id="gamepad">
    <SimpleKeypad 
      v-if="!isWordSolved"
      :keys="keypadKeys"
      @input="(value) => emits('input', Number(value))" 
    />
    
    <div class="spacer" v-if="!isWordSolved"></div>
    
    <ToolBar 
      :tools="tools"
      @tool-selected="(key) => emits('toolSelected', key)"
    />
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/design-tokens/palette';

:deep(.icon-button) {
  &.define {
    @include palette.color-attribute('color', 'mint');
  }
  &.continue {
    @include palette.color-attribute('color', 'purple');
  }
  &.hint {
    @include palette.color-attributes((
      'color': 'yellow',
      'background-color': 'background'
    ));
  }
  &.image-search {
    @include palette.color-attribute('color', 'indigo');
  }
  &.web-search {
    @include palette.color-attribute('color', 'blue');
  }
  &.wikipedia-search {
    @include palette.color-attribute('color', 'body');
  }
}

// :deep(.keypad-button:first-of-type) {
//   @include palette.color-attribute('color', 'yellow');
// }
</style>
