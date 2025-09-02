<script setup lang="ts">
import { ref } from 'vue';
import { LocalizedStringKey } from '@/models/localization';
import useGameStore from '@/stores/game';
import { dynamicLocalizedString, localizedString } from '@/services/localization';
import TermFoldableRow from '@/components/form/TermFoldableRow.vue';
import Section from '@vueties/components/form/VuetyFormSection.vue'
import VuetySearchView from '@vueties/views/VuetySearchView.vue'

defineProps<{
  term?: string
}>()

const content = useGameStore().content

const selectedTermIndex = ref<number>()

function search(input: string) {
  selectedTermIndex.value = undefined
  
  return content?.searchForTerms(input) ?? []
}

function onTermSelected(index: number) {
  selectedTermIndex.value = index !== selectedTermIndex.value ? index : undefined
}
</script>

<template>
  <VuetySearchView 
    :placeholder="localizedString(LocalizedStringKey.Text_SearchPlaceholder)"
    :search="search"
  >
    <template #results="slotProps">
      <Section 
        :title="dynamicLocalizedString(LocalizedStringKey.Text_NumResultsFor, slotProps.input, slotProps.results)"
      >
        <TermFoldableRow
          v-for="(result, index) in slotProps.results" 
          :key="index"
          :isUnfolded="index === selectedTermIndex"
          :term="result" 
          @selected="onTermSelected(index)" 
        />
      </Section>
    </template>
    
    <template #searching="slotProps">
      <div class="outcome">
        {{ `${localizedString(LocalizedStringKey.Text_SearchingFor)} "${slotProps.input}"...` }}
      </div>
    </template>
    
    <template #no-results="slotProps">
      <div v-if="slotProps.input.length > 0" class="outcome">
        {{ `${localizedString(LocalizedStringKey.Text_NoResultsFor)} "${slotProps.input}"` }}
      </div>
    </template>
  </VuetySearchView>
</template>

<style scoped lang="scss">
@use '@design-tokens/palette';

.outcome {
  text-align: center;
  @include palette.color-attribute('color', 'tertiary-body');
}
</style>
