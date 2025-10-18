<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { Deck } from '@/models/game';
import useCatalogStore from '@/stores/catalog'
import VuetyForm from '@/vueties/components/form/VuetyForm.vue';
import VuetyFormSection from '@/vueties/components/form/VuetyFormSection.vue';
import VuetyNavigationalView from '@/vueties/views/VuetyNavigationalView.vue';
import CardRow from '@/components/form/CardRow.vue';
import { backNavBarItem } from '@/vueties/components/shared/view-models';
import VuetyButtonFormRow from '@/vueties/components/form/rows/VuetyButtonFormRow.vue';
import { Icon } from '@/assets/design-tokens/iconography';

const props = defineProps<{
  _key: string
}>()

const catalog = useCatalogStore()
const deck = ref<Deck>()

onMounted(async () => {
  deck.value = await catalog.getDeckAndGenerateCards(props._key)
})
</script>

<template>  
  <VuetyNavigationalView
    :nav-bar-items="[backNavBarItem()]"
    :title="deck?.title"
  >
    <VuetyForm v-if="deck">
      <VuetyFormSection>
        <VuetyButtonFormRow
          :label="`Flashcards`"
          :icon="Icon.Flashcard"
        />
      </VuetyFormSection>
      
      <VuetyFormSection>
        <VuetyButtonFormRow
          :label="`Review`"
          :icon="Icon.CheckmarkCircle"
        />
      </VuetyFormSection>
      
      <VuetyFormSection>
        <CardRow
          v-for="(card, index) of deck.cards"
          :key="index"
          :card="card"
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
