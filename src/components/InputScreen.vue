<script setup lang="ts">
import { computed, watch, useTemplateRef, nextTick, onMounted } from 'vue';
import { type InputState } from '@/models/input'
import { RawContent } from '@/models/content'
import { localizedStringForTermTag } from '@/services/localization';
import fitText from '@vueties/composables/fit-text'
import TextTag from '@vueties/components/misc/VuetyTextTag.vue';

const { state } = defineProps<{
  state: InputState
}>()

const inputHeadlineRef = useTemplateRef('input-headline')

const showsTags = computed(() => state.term.extras?.tags !== undefined)
const showsAliases = computed(() => state.term.aliases !== undefined)
const showsExtras = computed(() => state.isComplete && (showsAliases.value || showsTags.value))

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
    <div class="spacer"></div>
    
    <TextTag
      v-if="!state.isComplete"
      :label="state.term.language.toUpperCase()"
      class="small"
    />
    
    <h1 ref="input-headline" class="serif">
      {{ state.prefixedInputString }}
    </h1>
    
    <div v-if="showsExtras" id="extras">
      <div v-if="showsTags" id="tags">
        <TextTag 
          v-for="(tag, index) of state.term.extras!.tags" 
          :key="index"
          :label="localizedStringForTermTag(tag)"
          class="small"
        />
      </div>
      <h6 v-if="showsAliases" class="serif">
        {{ RawContent.aliasesStringFromTerm(state.term) }}
      </h6>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@vueties/utils/styles';
@use '@design-tokens/typography';
@use "@design-tokens/palette";

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
    @include palette.color-attribute('color', 'tertiary-body');
  }
}
</style>
