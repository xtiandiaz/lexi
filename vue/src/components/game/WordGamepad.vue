<script setup lang="ts">
import WordToolbar from './WordToolbar.vue'
import WordKeypad from './WordKeypad.vue';
import { computed } from 'vue'
import { ToolKey, type ITool } from '@/models/tools'

const isWordSolved = computed(() => tools.map(t => t.key).contains(ToolKey.Continue))

const { word, inputableLetterIndices, inputLetterIndices, tools } = defineProps<{
  word: string,
  inputableLetterIndices: number[],
  inputLetterIndices: number[],
  tools: ITool[]
}>()

const emits = defineEmits<{
  input: [index: number],
  deleted: [void],
  toolSelected: [key: ToolKey]
}>()

// function onLetterInput(index: number) {
//   if (index >= 0 && (!inputableLetterIndices.contains(index) || inputLetterIndices.contains(index))) {
//     return
//   }
//   emits('input', index)
// }
</script>

<template>
  <section id="gamepad">
    <WordKeypad 
      v-if="!isWordSolved"
      ref="keypad" 
      :word="word" 
      :inputable-letter-indices="inputableLetterIndices" 
      :input-letter-indices="inputLetterIndices"
      @input="(index) => emits('input', index)" 
    />
    <div class="spacer" v-if="!isWordSolved"></div>
    <WordToolbar
      :tools="tools"
      @tool-selected="(tool) => emits('toolSelected', tool)" 
    />
  </section>
</template>
