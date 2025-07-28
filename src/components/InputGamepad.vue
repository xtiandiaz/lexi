<script setup lang="ts">
import { computed } from 'vue'
// import { useRoute } from 'vue-router';
import { type InputState } from '@/models/input';
import { ToolKey } from '@/models/tools'
// import { Section } from '@/models/section';
import useGameStore from '@/stores/game'
import { launchResearchToolForTerm } from '@/services/tool-handler';
import { keypadKeyVMs } from '@/view-models/vm-input';
import ResearchToolbar from './ResearchToolbar.vue';
import VuetyKeypad from '@/vueties/components/pads/VuetyKeypad.vue';
import VuetyToolbar from '@vueties/components/bars/VuetyToolbar.vue'
import VuetyIconButton from '@vueties/components/buttons/VuetyIconButton.vue'
import { Icon } from '@design-tokens/iconography'
import { researchToolKeysInDisplayOrder } from '@/utils/game.utils'
// import { isMobile } from '@/assets/tungsten/navigator';
import { toolIcon } from '@/utils/tool.utils';
import type { VuetyToolbarItem } from '@/vueties/components/shared.vm';

// const route = useRoute()

const { state } = defineProps<{
  state: InputState
}>()

const emits = defineEmits<{
  input: [index: number],
  setTool: [key: ToolKey],
  continued: [void]
}>()

const game = useGameStore()

// const shouldEnableKeyboard = computed(() => route.name === Section.Game && (import.meta.env.DEV || !isMobile()))
// const keyboardInput = useTemplateRef('keyboard-input')
const _keypadKeyVMs = computed(() => keypadKeyVMs(state))

const inputToolItems = computed<VuetyToolbarItem<ToolKey>[]>(() => [ToolKey.Hint].map(key => {
  return { 
    icon: toolIcon({ key }), 
    isEnabled: state.inputString !== state.inputableString.substring(0, state.inputableString.length - 1),
    key: key 
  }
}))

function onInput(index: number) {
  emits('input', index)
  
  // focusKeyboardInputIfNeeded()
}

function onInputToolSelected(key: ToolKey) {
  emits('setTool', key)
  
  // focusKeyboardInputIfNeeded()
}

// function focusKeyboardInputIfNeeded() {
//   keyboardInput.value?.focus()
// }

// watch(() => state, (newValue) => {
//   if (keyboardInput.value && !newValue.isComplete) {
//     focusKeyboardInputIfNeeded()
//   }
// })

// watch(shouldEnableKeyboard, (value) => {
//   console.log(value)
  
//   if (!value || !keyboardInput.value) {
//     return
//   }
  
//   keyboardInput.value.addEventListener("keydown", (e: KeyboardEvent) => {
//     // console.log(e.key, e.code)
    
//     switch (e.code) {
//       case 'Backspace':
//         onInput(-1)
//         break
//       default:
//         const char = e.key.toLowerCase()    
//         const index = state.firstAvailableInputableCharIndex(char)
//         if (index >= 0) {
//           onInput(index)
//         }
//         break
//     }
//   })
  
//   window.addEventListener('click', () => {
//     focusKeyboardInputIfNeeded()
//   })
  
//   focusKeyboardInputIfNeeded()
// }, { immediate: true })
</script>

<template>
  <section id="gamepad">
    <VuetyKeypad 
      v-if="!state.isComplete"
      :keyVMs="_keypadKeyVMs"
      @input="(value: string | number) => onInput(Number(value))" 
    />
    
    <!-- <input 
      v-if="shouldEnableKeyboard" 
      ref="keyboard-input" 
      class="keyboard-input"
    /> -->
    
    <ResearchToolbar
      v-if="state.isComplete"
      :term="state.term"
      :toolKeys="researchToolKeysInDisplayOrder"
      @setTool="(tool) => launchResearchToolForTerm(tool, state.term)"
    />
    
    <div class="flex-spacer"></div>
    
    <VuetyToolbar
      v-if="!game.test && !state.isComplete"
      :items="inputToolItems"
      @setTool="(key) => onInputToolSelected(key)"
    />
    
    <VuetyIconButton 
      v-if="state.isComplete"
      :icon="Icon.ArrowRight" 
      class="continue filled"
      @click="emits('continued')" 
    />
  </section>
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;

.keyboard-input {
  opacity: 0;
  position: absolute;
  z-index: -100;
  
  &:hover {
    cursor: default;
  }
}

:deep(.vuety-icon-button) {
  &.hint * {
    @include vs.color-attribute('color', 'yellow');
  }
}
</style>
