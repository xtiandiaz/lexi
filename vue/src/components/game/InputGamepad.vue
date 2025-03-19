<script setup lang="ts">
import { computed } from 'vue'
import { type InputState } from '@/models/input';
import { InputTool } from '@/models/tools'
import { launchResearchToolForWord } from '@/services/tool-handler';
import { Icon } from '@/assets/design-tokens/iconography'
import { inputToolBarButtonVMs, keypadKeyVMs } from '@/view-models/vm-input';
import SimpleKeypad from '../vueties/pads/SimpleKeypad.vue';
import ResearchToolBar from './ResearchToolBar.vue';
import ToolBar from '../vueties/bars/ToolBar.vue'
import IconButton from '../vueties/buttons/IconButton.vue';

const { state } = defineProps<{
  state: InputState
}>()

const emits = defineEmits<{
  input: [index: number],
  inputToolSelected: [tool: InputTool],
  continued: [void]
}>()

const _keypadKeyVMs = computed(() => keypadKeyVMs(state))
const _inputToolBarButtonVMs = computed(() => inputToolBarButtonVMs(state))
</script>

<template>
  <section id="gamepad">
    <SimpleKeypad 
      v-if="!state.isComplete"
      :keyVMs="_keypadKeyVMs"
      @input="(value) => emits('input', Number(value))" 
    />
    
    <ResearchToolBar
      v-if="state.isComplete"
      @tool-selected="(tool) => launchResearchToolForWord(tool, state.source.baseWord)"
    />
    
    <div class="spacer"></div>
    
    <ToolBar
      v-if="!state.isComplete"
      :buttonVMs="_inputToolBarButtonVMs"
      @tool-selected="(tool) => emits('inputToolSelected', tool)"
    />
    
    <IconButton 
      v-if="state.isComplete"
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
