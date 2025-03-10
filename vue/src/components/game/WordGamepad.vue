<script setup lang="ts">
import WordToolbar from './WordToolbar.vue'
import WordKeypad from './WordKeypad.vue';
import { computed } from 'vue'
import { WordTool } from '@/models/tools'

const isWordSolved = computed(() => Array.from(tools.keys()).contains(WordTool.Continue))

const { word, inputableLetterIndices, inputLetterIndices, tools } = defineProps<{
  word: string,
  inputableLetterIndices: number[],
  inputLetterIndices: number[],
  tools: Map<WordTool, boolean>
}>()

const emits = defineEmits<{
  input: [index: number],
  deleted: [void],
  toolSelected: [tool: WordTool]
}>()

function onLetterInput(index: number) {
  if (!inputableLetterIndices.contains(index) || inputLetterIndices.contains(index)) {
    return
  }
  emits('input', index)
}

function onDeleted() {
  emits('deleted')
}
</script>

<template>
  <section id="gamepad">
    <WordKeypad 
      v-if="!isWordSolved"
      ref="keypad" 
      :word="word" 
      :inputable-letter-indices="inputableLetterIndices" 
      :input-letter-indices="inputLetterIndices"
      @letter-input="onLetterInput" 
      @deleted="onDeleted" 
    />
    <div class="spacer" v-if="!isWordSolved"></div>
    <WordToolbar
      :tools="tools"
      @tool-selected="(tool) => emits('toolSelected', tool)" 
    />
  </section>
</template>
