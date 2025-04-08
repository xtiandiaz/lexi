<script setup lang="ts">
import { computed, onMounted, useTemplateRef, watch } from 'vue'
import { type InputState } from '@/models/input';
import { InputTool } from '@/models/tools'
import { launchResearchToolForWord } from '@/services/tool-handler';
import { inputToolBarButtonVMs, keypadKeyVMs } from '@/view-models/vm-input';
import { Icon } from '@design-tokens/iconography'
import ResearchToolBar from './ResearchToolBar.vue';
import SimpleKeypad from '@vueties/pads/SimpleKeypad.vue';
import ToolBar from '@vueties/bars/ToolBar.vue'
import IconButton from '@vueties/buttons/IconButton.vue'
import { isMobile } from '@/assets/tungsten/navigator';

const { state } = defineProps<{
  state: InputState
}>()

const emits = defineEmits<{
  input: [index: number],
  inputToolSelected: [tool: InputTool],
  continued: [void]
}>()

const keyboardInput = useTemplateRef('keyboard-input')
const _keypadKeyVMs = computed(() => keypadKeyVMs(state))
const _inputToolBarButtonVMs = computed(() => inputToolBarButtonVMs(state))

function onInput(index: number) {
  emits('input', index)
  
  focusKeyboardInputIfNeeded()
}

function onInputToolSelected(tool: InputTool) {
  emits('inputToolSelected', tool)
  
  focusKeyboardInputIfNeeded()
}

function focusKeyboardInputIfNeeded() {
  keyboardInput.value?.focus()
}

watch(() => state, (newValue) => {
  if (keyboardInput.value && !newValue.isComplete) {
    focusKeyboardInputIfNeeded()
  }
})

onMounted(() => {
  if (!keyboardInput.value) {
    return
  }
  
  keyboardInput.value.addEventListener("keydown", (e: KeyboardEvent) => {
    // console.log(e.key, e.code)
    
    switch (e.code) {
      case 'Backspace':
        onInput(-1)
        break
      default:
        const char = e.key.toLowerCase()    
        const index = state.firstAvailableInputableCharIndex(char)
        if (index >= 0) {
          onInput(index)
        }
        break
    }    
  })
  
  window.addEventListener('click', () => {
    focusKeyboardInputIfNeeded()
  })
  
  focusKeyboardInputIfNeeded()
})
</script>

<template>
  <section id="gamepad">
    <SimpleKeypad 
      v-if="!state.isComplete"
      :keyVMs="_keypadKeyVMs"
      @input="(value: string | number) => onInput(Number(value))" 
    />
    
    <input 
      ref="keyboard-input" 
      v-if="!isMobile()" 
      class="keyboard-input"
    />
    
    <ResearchToolBar
      v-if="state.isComplete"
      @tool-selected="(tool) => launchResearchToolForWord(tool, state.source.term.word)"
    />
    
    <div class="spacer"></div>
    
    <ToolBar
      v-if="!state.isComplete"
      :buttonVMs="_inputToolBarButtonVMs"
      @tool-selected="(tool: InputTool) => onInputToolSelected(tool)"
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
@use '@design-tokens/palette';

.keyboard-input {
  opacity: 0;
  position: absolute;
  z-index: -100;
  
  &:hover {
    cursor: default;
  }
}

:deep(.icon-button) {
  &.continue {
    @include palette.color-attribute('background-color', 'background');
  }
  &.hint {
    @include palette.color-attribute('color', 'yellow');
  }
}
</style>
