<script setup lang="ts">
defineProps<{
  source: string
}>()
const emits = defineEmits<{
  close: [void: void]
}>()
</script>

<template>
  <div class="modal"></div>
  <div id="cinema">
    <button class="close" @click="emits('close')">
      <span class="icon"></span>
    </button>
    <div class="stage">
      <iframe src="https://dle.rae.es/difundir" ></iframe>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@design-tokens/palette';
@use '@design-tokens/iconography';

#cinema {
  position: absolute;
  top: 1em;
  right: 1em;
  bottom: 1em;
  left: 1em;
  z-index: 200;
  border-radius: 1em;
  @include palette.color-attribute('background-color', 'background');
  
  div.stage {
    position: absolute;
    top: 3em;
    right: 0.5em;
    bottom: 0.5em;
    left: 0.5em;
    border-radius: 0.5em;
    @include palette.color-attribute('background-color', 'secondary-background');
    
    iframe {
      position: relative;
      width: 100%;
      height: 100%;
      border: none;
    }
  }
  
  button.close {
    position: absolute;
    top: 0em;
    right: 0em;
  }
}
</style>

