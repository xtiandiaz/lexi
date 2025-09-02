<script setup lang="ts">
import { computed, watch, useTemplateRef, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import type { InputState } from '@/models/input';
import type { VuetyKeypadKey } from '@/vueties/components/shared/view-models';
import { deleteKey } from '@/vueties/components/shared/view-models';
import VuetyKeypad from '@/vueties/components/pads/VuetyKeypad.vue';
import { getFirstCharIndexAtInputState, labelForKey } from '@/utils/input.utils';
import { isMobile } from '@/assets/tungsten/navigator';

const { inputState } = defineProps<{
  inputState: InputState
}>()

const emits = defineEmits<{
  input: [value: number]
}>()

const keys = computed<VuetyKeypadKey<number>[]>(() => inputState.inputableIndices
  .map((i) => { return {
    isEnabled: !inputState.indices.includes(i),
    label: labelForKey(inputState.word[i]), 
    value: i 
  } as VuetyKeypadKey<number> })
  .concat(deleteKey<number>(-1, inputState.indices.length > 0))
)

const route = useRoute()
const shouldEnableKeyboard = computed(() => route.name === 'game' && (import.meta.env.DEV || !isMobile()))
const keyboardInput = useTemplateRef('keyboard-input')

function onInput(value: number) {
  emits('input', value)
}

function focusKeyboardInputIfNeeded() {
  keyboardInput.value?.focus()
}

watch(() => inputState, () => {
  if (keyboardInput.value) {
    focusKeyboardInputIfNeeded()
  }
})

onMounted(() => {
  if (!shouldEnableKeyboard.value || !keyboardInput.value) {
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
        const index = getFirstCharIndexAtInputState(char, inputState)
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
  <VuetyKeypad 
    :keys="keys"
    @input="onInput"
  />
  
  <input 
    v-if="shouldEnableKeyboard" 
    ref="keyboard-input" 
    class="keyboard-input"
  />
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;

.vuety-keypad {
  :deep(label) {
    @extend %serif;
  }
}

.keyboard-input {
  opacity: 0;
  position: absolute;
  z-index: -100;
  
  &:hover {
    cursor: default;
  }
}
</style>
