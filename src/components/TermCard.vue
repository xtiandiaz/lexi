<script setup lang="ts">
import { computed } from 'vue';
import type { Term } from '@/models/content.models';
import type { AnyTool } from '@/models/tools';
import { ToolKey } from '@/models/tools';
import TermToolbar from './TermToolbar.vue'
import VuetyTag from '@vueties/components/misc/VuetyTag.vue';
import { researchToolKeysInDisplayOrder } from '@/utils/game.utils';
import '@/assets/tungsten/extensions/array.extensions'
import { inputStringsFromState } from '@/utils/input.utils';

const { term } = defineProps<{
  term: Term
}>()

const emits = defineEmits<{
  useTool: [tool: AnyTool]
}>()

const inputState = computed(() => term.inputState)

const word = computed(() => {
  if (inputState.value) {
    const inputStrings = inputStringsFromState(inputState.value)
    return term.word.substring(0, term.word.length - inputState.value.inputableIndices.length) + inputStrings.input
  }
  return term.word
})

const isObfuscated = computed(() => inputState.value !== undefined)
const obfuscatedSlab = computed(() => {
  return Array.range(0, term.word.length - word.value.length).map(() => '•').join('')
})

const toolKeys = computed(() => inputState.value ? [ToolKey.Clue] : researchToolKeysInDisplayOrder)
</script>

<template>
  <div class="term-slide-wrapper">
    <div :class="['term-slide', { obfuscated: isObfuscated }]">      
      <VuetyTag class="language-tag small" :label="term.language.toUpperCase()" />
      
      <div class="extras"></div>
      
      <div class="flex-spacer"></div>
      
      <h2 ref="input-headline" class="word">
        {{ word }}<span v-if="isObfuscated" class="obfuscation">{{ obfuscatedSlab }}</span>
      </h2>
      
      <Transition name='fade'>
        <h6 v-if="term.aliases && !isObfuscated" class="aliases">
          {{ term.aliases?.join(', ') }}
        </h6>
      </Transition>
      
      <div class="flex-spacer"></div>
      
      <div class="tools">
        <TermToolbar
          :term="term" 
          :toolKeys="toolKeys" 
          @useTool="(tool) => emits('useTool', tool)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@vueties/utils/vuetystrap' as vs;

@include vs.fade();

.term-slide-wrapper {
  $max-width: 420px;
  
  max-width: $max-width;
  max-height: calc($max-width * 3 / 4);
}

.term-slide {
  $padding: 0.5rem;
  
  align-items: center;
  border-radius: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  padding: $padding;
  position: relative;
  transition: all 0.25s ease-in-out;
  width: 100%;
  @include vs.color-attribute('background-color', vs.$background-color);
  
  .language-tag {
    transform: translate(-50%, -50%);
    @include vs.position(absolute, 2rem, null, null, 50%)
  }
  
  .word, .aliases {
    @extend %serif;
    margin: 0;
    transition: all 0.25s ease-in-out;
    
    &.aliases {
      @include vs.color-attribute('color', vs.$tertiary-body-color);
    }
    
    .obfuscation {
      opacity: 0.5;
    }
  }
  
  .tools, .extras {
    min-height: 3rem;
    width: 100%;
  }
  
  .extras {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;
    
    .svg-icon {
      @include vs.color-attribute('color', vs.$tertiary-body-color);
    }
  }
  
  .vuety-toolbar {
    gap: 0;
    justify-content: space-evenly;
  }
}
</style>
