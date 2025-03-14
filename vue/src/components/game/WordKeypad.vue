<script setup lang="ts">
import { computed } from 'vue';
import SimpleKeypad from '../vueties/pads/SimpleKeypad.vue';
import type { IKeypadKey } from '../vueties/models';
import { IconKey } from '@/assets/design-tokens/iconography';

const { word, inputableLetterIndices, inputLetterIndices } = defineProps<{
  word: string,
  inputableLetterIndices: number[],
  inputLetterIndices: number[],
}>()

const emits = defineEmits<{
  input: [index: number]
}>()

const keypadKeys = computed<IKeypadKey[]>(() => {
  const keys: IKeypadKey[] = inputableLetterIndices.map(li => {
    return { label: word[li].toLowerCase(), value: li, isEnabled: !inputLetterIndices.contains(li) }
  })
  keys.push({ label: IconKey.Delete, value: -1, isEnabled: inputLetterIndices.length !== 0 })
  return keys
})
</script>

<template>
  <SimpleKeypad :keys="keypadKeys" @input="(value) => emits('input', Number(value))"/>
<!-- <div id="keypad">
  <button 
    class="letter" v-for="(letterIndex, keyIndex) of inputableLetterIndices" 
    :key="keyIndex"
    :disabled="inputLetterIndices.contains(letterIndex)"
    @click="emits('letterInput', letterIndex)"
  >
    <h5>{{ word[letterIndex].toLowerCase() }}</h5>
  </button>
  <button 
    class='letter delete' 
    :disabled="inputLetterIndices.length === 0"
    @click="emits('deleted')"
  >
    <span class='icon medium'></span>
  </button>
</div> -->
</template>

<style lang="scss" scoped>
@use '@/assets/theme';
@use '../../assets/design-tokens/typography';
@use '../../assets/design-tokens/palette';
@use '../../assets/design-tokens/iconography';
@use '../vueties/assets/pads';

.pad {
  :deep(button:first-of-type) {
    @include palette.color-attribute('color', 'yellow');
  }
}

$letter-size: 3; // em
$letter-gap: 0.5;
$letter-count-row: 8;

#keypad {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 32em;
  gap: #{$letter-gap} + 'em';
  
  h5 {
    margin: 0;
  }
  
  button.letter {
    border-radius: 0.5em;
    height: #{$letter-size} + 'em';
    width: #{$letter-size} + 'em';
    
    &:enabled {
      @include palette.color-attribute('background-color', 'background');
    }
    
    &.delete {
      .icon {
        font-size: 1.25em;
        margin: 0 auto;
        vertical-align: middle;
        @include iconography.colored-icon-content-attribute('delete', 'background');
      }
      
      &:enabled {
        @include palette.color-attribute('background-color', 'body');
      }
      &:disabled .icon {
        @include iconography.colored-icon-content-attribute('delete', 'body');
      }
    }
  }
}
</style>
