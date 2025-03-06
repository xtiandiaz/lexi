<script setup lang="ts">
import WordToolbar from '@/components/WordToolbar.vue'
import WordKeypad from './WordKeypad.vue';
import { ref, computed, watch } from 'vue'
import { WordTool } from '@/models/tools';

const { word, inputableLetterIndices, tools } = defineProps<{
  word: string,
  inputableLetterIndices: number[],
  tools: WordTool[]
}>()

const emits = defineEmits<{
  inputChanged: [letterIndices: number[]],
  toolSelected: [tool: WordTool]
}>()

const inputLetterIndices = ref<number[]>([])
const isWordSolved = computed(() => tools.contains(WordTool.Continue))

watch(() => word, () => {
  inputLetterIndices.value = []
})

function onLetterInput(index: number) {
  if (!inputableLetterIndices.contains(index) || inputLetterIndices.value.contains(index)) {
    return
  }
  inputLetterIndices.value.push(index)
  
  console.log('Input letter indices:', inputLetterIndices.value.join(','))
  emits('inputChanged', inputLetterIndices.value)
}

function onDeleted() {
  inputLetterIndices.value.pop()
  emits('inputChanged', inputLetterIndices.value)
}
</script>

<template>
  <div id="gamepad" class="panel">
    <WordKeypad 
      v-if="!isWordSolved"
      ref="keypad" 
      :word="word" 
      :inputable-letter-indices="inputableLetterIndices" 
      :input-letter-indices="inputLetterIndices"
      @letter-input="onLetterInput" 
      @deleted="onDeleted" 
    />
    <div class="fill" v-if="!isWordSolved"></div>
    <WordToolbar
      :tools="tools"
      @tool-selected="(tool) => emits('toolSelected', tool)" 
    />
  </div>
</template>
