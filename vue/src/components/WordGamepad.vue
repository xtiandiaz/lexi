<script setup lang="ts">
import WordActionBar from '@/components/WordActionBar.vue'
import FooterActionsBar from '@/components/FooterActionsBar.vue'
import WordKeypad from './WordKeypad.vue';
import { ref, watch } from 'vue'
import { shuffle } from '@/assets/tungsten/randomness'

const { word } = defineProps<{
  word: string
}>()

const emits = defineEmits<{
  resetActiveWord: [void],
  launchMeaning: [sourceURL: string]
}>()

const ingameLetters = ref<string[]>(shuffle(word.split('')))

watch(() => word, (newValue) => {
  ingameLetters.value = shuffle(newValue.split(''))
})

function onLetterKeyPressed(index: number) {
  console.log(ingameLetters.value[index], `@ ${index}`)
}

function onDeleteKeyPressed() {
  console.log('delete pressed')
}
</script>

<template>
  <div id="gamepad" class="panel">
    <WordKeypad :letters="ingameLetters" @key-pressed="onLetterKeyPressed" @delete-pressed="onDeleteKeyPressed" />
    <WordActionBar :word="word" @launch-meaning="(sourceURL) => emits('launchMeaning', sourceURL)" />
    <FooterActionsBar @reset-active-word="emits('resetActiveWord')" />
  </div>
</template>
