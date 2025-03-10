<script setup lang="ts">
defineProps<{
  word: string,
  inputableLetterIndices: number[],
  inputLetterIndices: number[],
}>()

const emits = defineEmits<{
  letterInput: [index: number],
  deleted: [void]
}>()
</script>

<template>
<div id="keypad">
  <button 
    class="letter" v-for="(letterIndex, keyIndex) of inputableLetterIndices" 
    :key="keyIndex"
    :disabled="inputLetterIndices.contains(letterIndex)"
    @click="emits('letterInput', letterIndex)"
  >
    <h3>{{ word[letterIndex].toLowerCase() }}</h3>
  </button>
  <button 
    class='letter delete' 
    :disabled="inputLetterIndices.length === 0"
    @click="emits('deleted')"
  >
    <span class='icon'></span>
  </button>
</div>
</template>

<style scoped lang="scss">
@use '../../assets/design-tokens/typography';
@use '../../assets/design-tokens/palette';
@use '../../assets/design-tokens/iconography';

$letter-size: 4.5; // em
$letter-gap: 0.5;
$letter-count-row: 8;

#keypad {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 32em;
  gap: #{$letter-gap} + 'em';
  
  h3 {
    margin: 0;
  }
  
  button.letter {    
    display: inline-flex;    
    border-color: transparent;
    justify-content: center;
    align-items: center;
    width: #{$letter-size} + 'em';
    height: #{$letter-size} + 'em';
    border-radius: 0.5em;
    
    &:enabled {
      @include palette.color-attribute('background-color', 'background');
    }
    
    &.delete {
      &:enabled {
        @include palette.color-attribute('background-color', 'body');
      }
      
      .icon {
        font-size: 1.75em;
        @include iconography.colored-icon-content-attribute('delete', 'background');
      }
      
      &:disabled .icon {
        @include iconography.colored-icon-content-attribute('delete', 'body');
      }
    }
  }
}
</style>
