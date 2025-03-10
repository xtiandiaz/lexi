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
    <h4>{{ word[letterIndex].toLowerCase() }}</h4>
  </button>
  <button 
    class='letter delete' 
    :disabled="inputLetterIndices.length === 0"
    @click="emits('deleted')"
  >
    <span class='icon medium'></span>
  </button>
</div>
</template>

<style scoped lang="scss">
@use '../../assets/design-tokens/typography';
@use '../../assets/design-tokens/palette';
@use '../../assets/design-tokens/iconography';

$letter-size: 3.5; // em
$letter-gap: 0.5;
$letter-count-row: 8;

#keypad {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 32em;
  gap: #{$letter-gap} + 'em';
  
  h4 {
    margin: 0;
  }
  
  button.letter {
    width: #{$letter-size} + 'em';
    height: #{$letter-size} + 'em';
    border-radius: 0.5em;
    
    &:enabled {
      @include palette.color-attribute('background-color', 'background');
    }
    
    &.delete {
      .icon {
        font-size: 1.25em;
        margin: 0 auto;
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
