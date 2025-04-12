<script setup lang="ts">
import { computed } from 'vue';
import type { Language } from '@/models/language';
import settingsStore from '@/stores/settings'
import { resetCurrentLanguage } from '@/services/settings-management';
import { languageChoiceSectionVM } from '@/view-models/vm-settings';
import ChoiceSection from '@vueties/form/ChoiceSection.vue';

const settings = settingsStore()

const choiceSectionVM = computed(() => languageChoiceSectionVM(settings.currentLanguage))
</script>

<template>
  <section class="form">
    <ChoiceSection 
      :vm="choiceSectionVM" 
      @selected="(lang: Language) => resetCurrentLanguage(lang)"
    />
  </section>
</template>

<style scoped lang="scss">
@use '@vueties/styles/form' with (
  $max-width: auto
);
@use '@design-tokens/palette';

:deep(.representative-icon) {
  @include palette.color-attribute('color', 'tertiary-body');
}
</style>
