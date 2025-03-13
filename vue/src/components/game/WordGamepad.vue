<script setup lang="ts">
import WordToolbar from './WordToolbar.vue'
import WordKeypad from './WordKeypad.vue';
import { computed } from 'vue'
import { WordToolKey, type IWordTool } from '@/models/tools'

const isWordSolved = computed(() => tools.map(t => t.key).contains(WordToolKey.Continue))

const { word, inputableLetterIndices, inputLetterIndices, tools } = defineProps<{
  word: string,
  inputableLetterIndices: number[],
  inputLetterIndices: number[],
  tools: IWordTool[]
}>()

const emits = defineEmits<{
  input: [index: number],
  deleted: [void],
  toolSelected: [key: WordToolKey]
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
