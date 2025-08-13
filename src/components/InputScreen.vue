<script setup lang="ts">
import { computed, watch, useTemplateRef, nextTick, onMounted } from 'vue';
import { type InputState } from '@/models/input'
import { GameMode } from '@/models/game';
import useGameStore from '@/stores/game'
import fitText from '@vueties/composables/fit-text'
import VuetyTag from '@vueties/components/misc/VuetyTag.vue';

const { state } = defineProps<{
  state: InputState
}>()

const game = useGameStore()
const settings = game.settings

const inputHeadlineRef = useTemplateRef('input-headline')

const shouldTagLanguage = computed(() => 
  !state.isComplete && settings.activeLanguages.length > 1 && game.mode === GameMode.Exploration
)

async function fitInput() {
  await nextTick()
  
  fitText(inputHeadlineRef.value!, 3)
}

watch(async () => state.prefixedInputString, async () => {
  await fitInput()
})

onMounted(async () => {
  await fitInput()
})
</script>

<template>
  <section id="screen">
    <div class="flex-spacer"></div>
    
    <VuetyTag
      v-if="shouldTagLanguage"
      :label="state.term.language.toUpperCase()"
      class="small"
    />
    
    <h1 ref="input-headline" class="serif">
      {{ state.prefixedInputString }}
    </h1>
  </section>
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;

h1, h6 {
  margin: 0.125em 0;
}

#extras {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  justify-content: center;
  
  #tags {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }
  
  h6 {
    @include vs.color-attribute('color', vs.$tertiary-body-color);
  }
}
</style>
