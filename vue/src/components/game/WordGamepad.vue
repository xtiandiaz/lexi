<script setup lang="ts">
import { computed } from 'vue'
import { InputTool } from '@/models/tools'
import type { IKeypadKeyVM, ToolBarButtonVM } from '../vueties/view-models';
import { Icon } from '@/assets/design-tokens/iconography'
import SimpleKeypad from '../vueties/pads/SimpleKeypad.vue';
import ToolBar from '../vueties/bars/ToolBar.vue'
import ResearchToolBar from './ResearchToolBar.vue';
import { launchResearchToolForWord, canUseInputTool } from '@/services/tool-handler';
import IconButton from '../vueties/buttons/IconButton.vue';
import { InputState } from '@/models/input';

const { word, inputableIndices, inputIndices, isWordSolved } = defineProps<{
  word: string,
  inputableIndices: number[],
  inputIndices: number[],
  isWordSolved: boolean
}>()

const emits = defineEmits<{
  input: [index: number],
  inputToolSelected: [tool: InputTool],
  continued: [void]
}>()

const keypadKeys = computed<IKeypadKeyVM[]>(() => {
  const keys: IKeypadKeyVM[] = inputableIndices.map(li => {
    return { label: word[li].toLowerCase(), value: li, isEnabled: !inputIndices.includes(li) }
  })
  keys.push({ label: Icon.Delete, value: -1, isEnabled: inputIndices.length !== 0 })
  return keys
})

const inputToolVMs = computed<ToolBarButtonVM<InputTool>[]>(() => {
  return [
    {
      tool: InputTool.Hint,
      icon: Icon.Hint,
      isEnabled: canUseInputTool(InputTool.Hint, new InputState(
        inputIndices,
        inputableIndices,
        word
      ))
    }
  ]
})
</script>

<template>
  <section id="gamepad">
    <SimpleKeypad 
      v-if="!isWordSolved"
      :keys="keypadKeys"
      @input="(value) => emits('input', Number(value))" 
    />
    
    <ResearchToolBar
      v-if="isWordSolved"
      @tool-selected="(tool) => launchResearchToolForWord(tool, word)"
    />
    
    <div class="spacer"></div>
    
    <ToolBar 
      v-if="!isWordSolved"
      :buttonVMs="inputToolVMs"
      @tool-selected="(tool) => emits('inputToolSelected', tool)"
    />
    
    <IconButton 
      v-if="isWordSolved"
      :icon="Icon.ArrowRight" 
      class="continue"
      @click="emits('continued')" 
    />
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/design-tokens/palette';

:deep(.icon-button) {
  &.continue {
    @include palette.color-attribute('background-color', 'background');
  }
  &.hint {
    @include palette.color-attribute('color', 'yellow');
  }
}
</style>
