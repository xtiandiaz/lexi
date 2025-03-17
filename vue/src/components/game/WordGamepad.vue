<script setup lang="ts">
import { computed } from 'vue'
import { WordToolKey, wordTool } from '@/models/tools'
import type { IKeypadKey } from '../vueties/models';
import { IconKey } from '@/assets/design-tokens/iconography'
import { canHint } from '@/services/word-utils'
import SimpleKeypad from '../vueties/pads/SimpleKeypad.vue';
import ToolBar from '../vueties/bars/ToolBar.vue'

const { word, inputableIndices, inputIndices, isWordSolved } = defineProps<{
  word: string,
  inputableIndices: number[],
  inputIndices: number[],
  isWordSolved: boolean
}>()

const emits = defineEmits<{
  input: [index: number],
  toolSelected: [key: WordToolKey]
}>()

const keypadKeys = computed<IKeypadKey[]>(() => {
  const keys: IKeypadKey[] = inputableIndices.map(li => {
    return { label: word[li].toLowerCase(), value: li, isEnabled: !inputIndices.includes(li) }
  })
  keys.push({ label: IconKey.Delete, value: -1, isEnabled: inputIndices.length !== 0 })
  return keys
})
const topBarTools = computed(() => [
  WordToolKey.Define,
  WordToolKey.ImageSearch,
  WordToolKey.WikipediaSearch,
  WordToolKey.WebSearch, 
  WordToolKey.Translate,
].map(key => wordTool(key, true))
)
const bottomBarTools = computed(() => {
  if (!isWordSolved) {
    const isEnabled = canHint(word, inputIndices, inputableIndices)
    return [wordTool(WordToolKey.Hint, isEnabled)]
  }
  return [wordTool(WordToolKey.Continue)]
})
</script>

<template>
  <section id="gamepad">
    <SimpleKeypad 
      v-if="!isWordSolved"
      :keys="keypadKeys"
      @input="(value) => emits('input', Number(value))" 
    />
    
    <ToolBar
      v-if="isWordSolved"
      :tools="topBarTools"
      @tool-selected="(key) => emits('toolSelected', key)"
    />
    <div class="spacer"></div>
    <ToolBar 
      :tools="bottomBarTools"
      @tool-selected="(key) => emits('toolSelected', key)"
    />
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/design-tokens/palette';

:deep(.icon-button) {
  &.define {
    @include palette.color-attribute('color', 'orange');
  }
  &.continue {
    @include palette.color-attributes((
      'background-color': 'background'
    ));
  }
  &.hint {
    @include palette.color-attributes((
      'color': 'yellow',
      'background-color': 'background'
    ));
  }
  &.image-search {
    @include palette.color-attribute('color', 'mint');
  }
  &.translate {
    @include palette.color-attribute('color', 'blue')
  }
  &.web-search {
    @include palette.color-attribute('color', 'purple');
  }
  &.wikipedia-search {
    @include palette.color-attribute('color', 'body');
  }
}
</style>
