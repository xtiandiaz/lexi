<script setup lang="ts">
defineProps<{
  letters: string[]
}>()

const emits = defineEmits<{
  keyPressed: [index: number]
}>()
</script>

<template>
<div id="keypad">
  <button class='letter' v-for='(letter, index) of letters' :key='index' @click="emits('keyPressed', index)">
    <h5>{{ letter.toLowerCase() }}</h5>
  </button>
</div>
</template>

<style scoped lang="scss">
@use './../assets/design-tokens/typography';
@use './../assets/design-tokens/palette';

$letter-size: 4;
$letter-gap: 0.5;
$letter-count-row: 8;

#keypad {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  // width: #{$letter-count-row * $letter-size}  + 'em';
  max-width: 32em;
  gap: #{$letter-gap} + 'em';
  
  h5 {
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
    @include palette.color-attribute('background-color', 'background');
    
    &:hover {
      @include palette.color-attribute('color', 'mint');
    }
    
    &:disabled {
      background-color: transparent;
      opacity: 25%;
    }
  }
}
</style>
