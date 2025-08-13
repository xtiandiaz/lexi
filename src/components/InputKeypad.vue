<script setup lang="ts">
import { computed } from 'vue'
import type { InputState } from '@/models/input';
import type { VuetyKeypadKey } from '@/vueties/components/shared/view-models';
import { deleteKey } from '@/vueties/components/shared/view-models';
import VuetyKeypad from '@vueties/components/pads/VuetyKeypad.vue';
import { labelForKey } from '@/utils/input.utils';

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

function onInput(value: number) {
  emits('input', value)
}
</script>

<template>
  <VuetyKeypad 
    :keys="keys"
    @input="onInput"
  />
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;

.vuety-keypad {
  :deep(label) {
    @extend %serif;
  }
}
</style>
