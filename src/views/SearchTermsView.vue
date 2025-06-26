<script setup lang="ts">
import { ref, computed } from 'vue';
import { LocalizedStringKey } from '@/models/localization';
import sessionStore from '@/stores/session';
import { localizedString } from '@/services/localization';
import TermFoldableRow from '@/components/TermFoldableRow.vue';
import VuetySearchView from '@/vueties/views/VuetySearchView.vue'

defineProps<{
  term?: string
}>()

const session = sessionStore()
const selectedTermIndex = ref<number>()

const placeholder = computed(() => {
  let message = localizedString(LocalizedStringKey.Text_SearchPlaceholder)
  if (session.content) {
    message += ` e.g., ${session.content.getRandomTerms(3)?.map(t => t.word).join(', ')}, ...`
  }
  return message
})

function search(input: string) {
  console.log('searching for: ', input)
  
  return session.content?.searchTerms(input)
}

function onTermSelected(index: number) {
  selectedTermIndex.value = index !== selectedTermIndex.value ? index : undefined
}
</script>

<template>
  <VuetySearchView 
    :placeholder="placeholder"
    :search="search"
  >
    <template #result="slotProps">
      <TermFoldableRow 
        :term="slotProps.result" 
        :isUnfolded="slotProps.key === selectedTermIndex"
        @selected="onTermSelected(slotProps.key)" 
      />
    </template>
    
    <template #searching="slotProps">
      <div class="outcome">
        {{ `${localizedString(LocalizedStringKey.Text_SearchingFor)} "${slotProps.input}"...` }}
      </div>
    </template>
    
    <template #no-results="slotProps">
      <div v-if="slotProps.input.length > 0" class="outcome">
        {{ `${localizedString(LocalizedStringKey.Text_NoResultsFor)} "${slotProps.input}"` }}"
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
