<script setup lang="ts">
import WordToolbar from '@/components/WordToolbar.vue'
import WordKeypad from './WordKeypad.vue';
import { ref, computed, watch } from 'vue'
import { WordTool } from '@/models/tools';

const inputLetterIndices = ref<number[]>([])

const isWordSolved = computed(() => Array.from(tools.keys()).contains(WordTool.Continue))

const { word, inputableLetterIndices, tools } = defineProps<{
  word: string,
  inputableLetterIndices: number[],
  tools: Map<WordTool, boolean>
}>()
watch(() => word, () => {
  inputLetterIndices.value = []
})

const emits = defineEmits<{
  inputChanged: [letterIndices: number[]],
  toolSelected: [tool: WordTool]
}>()

function onLetterInput(index: number) {
  if (!inputableLetterIndices.contains(index) || inputLetterIndices.value.contains(index)) {
    return
  }
  inputLetterIndices.value.push(index)
  
  // console.log('Input letter indices:', inputLetterIndices.value.join(','))
  emits('inputChanged', inputLetterIndices.value)
}

function onDeleted() {
  inputLetterIndices.value.pop()
  emits('inputChanged', inputLetterIndices.value)
}

defineExpose({
  replaceInputIndices
})

function replaceInputIndices(indices: number[]) {
  inputLetterIndices.value = indices
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
