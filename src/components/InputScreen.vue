<script setup lang="ts">
import { computed, watch, useTemplateRef, nextTick } from 'vue';
import { type InputState } from '@/models/input'
import { Content } from '@/models/content'
import { localizedStringForTermTag } from '@/services/localization';
import fitText from '@/composables/fit-text'
import TextTag from '@vueties/misc/TextTag.vue';

const { state } = defineProps<{
  state: InputState
}>()

const inputHeadlineRef = useTemplateRef('input-headline')

const showsTags = computed(() => state.source.term.tags !== undefined)
const showsAliases = computed(() => state.source.term.aliases !== undefined)
const showsExtras = computed(() => state.isComplete && (showsTags.value || showsAliases.value))

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
    <div v-if="showsExtras" id="extras">
      <div v-if="showsTags" id="tags">
        <TextTag 
          v-for="(tag, index) of state.source.term.tags" 
          :key="index"
          :label="localizedStringForTermTag(tag)"
          class="small"
        />
      </div>
      <h6 v-if="showsAliases" class="serif">
        {{ Content.aliasesStringFromTerm(state.source.term) }}
      </h6>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@design-tokens/typography';
@use "@design-tokens/palette";

#extras {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 1em;
  justify-content: center;
  
  #tags {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }
  
  h6 {
    margin: 0;
    @include palette.color-attribute('color', 'tertiary-body');
  }
}
</style>
