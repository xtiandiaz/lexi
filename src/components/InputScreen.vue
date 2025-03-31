<script setup lang="ts">
import { watch, useTemplateRef, nextTick } from 'vue';
import { type InputState } from '@/models/input'
import { Content } from '@/models/content'
import fitText from '@/composables/fit-text'

const { state } = defineProps<{
  state: InputState
}>()

const inputHeadlineRef = useTemplateRef('input-headline')

watch(async () => state.prefixedInputString, async () => {
  await nextTick()
  fitText(inputHeadlineRef.value!, 3)
})
</script>

<template>
  <section id="screen">
    <div class="spacer"></div>
    <h1 ref="input-headline" class="serif">
      {{ state.prefixedInputString }}
    </h1>
    <h6 class="serif" v-if="state.isComplete && state.source.term.linkedWords">
      {{ Content.makeLinkedWordsStringFromTerm(state.source.term) }}
    </h6>
  </section>
</template>

<style scoped lang="scss">
@use '@design-tokens/typography';
@use "@design-tokens/palette";

h6 {
  @include palette.color-attribute('color', 'tertiary-body');
}
</style>
