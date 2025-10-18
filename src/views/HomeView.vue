<script setup lang="ts">
import { computed, onMounted } from 'vue';
import type { Deck } from '@/models/game'
import useCatalogStore from '@/stores/catalog'
import VuetyForm from '@/vueties/components/form/VuetyForm.vue';
import VuetyFormSection from '@/vueties/components/form/VuetyFormSection.vue';
import VuetyPushFormRow from '@/vueties/components/form/rows/VuetyPushFormRow.vue';
import VuetyNavigationalView from '@/vueties/views/VuetyNavigationalView.vue';
import '@/assets/tungsten/extensions/array.extensions'

const catalog = useCatalogStore()
const groupedDecks = computed<Deck[][]>(() => catalog.decks.groupedBy(d => d.title.substring(0, 1)))

onMounted(async () => {
  catalog.load()
})
</script>

<template>
  <VuetyNavigationalView
    :title="`Lexi`"
    :nav-bar-items="[]"
  >
    <VuetyForm>   
      <VuetyFormSection
        v-for="(deckGroup, index) of groupedDecks"
        :key="index"
        :title="deckGroup.first()!.title[0]"
      >
        <VuetyPushFormRow
          v-for="(deck) of deckGroup"
          :key="deck.key"
          :path="`/deck/${deck.key}`"
          :title="deck.title"
          
        />
      </VuetyFormSection>
    </VuetyForm>
  </VuetyNavigationalView>
</template>

<style lang="scss" scoped>
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: 640px
);
</style>
