<script setup lang="ts">
import WordActionBar from '@/components/WordActionBar.vue'
import FooterActionsBar from '@/components/FooterActionsBar.vue'
import WordKeypad from './WordKeypad.vue';
import { onMounted, ref, watch } from 'vue'

const { word, inputableLetterIndices } = defineProps<{
  word: string,
  inputableLetterIndices: number[],
  isWordCompleted: boolean
}>()

const emits = defineEmits<{
  resetActiveWord: [void],
  updateInput: [letterIndices: number[]],
  launchMeaning: [sourceURL: string]
}>()

const inputLetterIndices = ref<number[]>([])

watch(() => word, () => {
  inputLetterIndices.value = []
})

function onLetterInput(index: number) {
  if (!inputableLetterIndices.contains(index) || inputLetterIndices.value.contains(index)) {
    return
  }
  inputLetterIndices.value.push(index)
  console.log('Input letter indices:', inputLetterIndices.value.join(','))
  emits('updateInput', inputLetterIndices.value)
}

function onDeleted() {
  inputLetterIndices.value.pop()
  emits('updateInput', inputLetterIndices.value)
}

// onMounted(() => {
//   resetContent(word)
// })
</script>

<template>
  <div id="gamepad" class="panel">
    <WordKeypad 
      v-if="!isWordCompleted"
      ref="keypad" 
      :word="word" 
      :inputable-letter-indices="inputableLetterIndices" 
      :input-letter-indices="inputLetterIndices"
      @input-letter="onLetterInput" 
      @delete="onDeleted" 
    />
    <WordActionBar
      v-if="isWordCompleted"
      :word="word" 
      @launch-meaning="(sourceURL) => emits('launchMeaning', sourceURL)" 
    />
    <FooterActionsBar @reset-active-word="emits('resetActiveWord')" />
  </div>
</template>
