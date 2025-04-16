<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue';
import type { Language } from '@/models/language'
import { type Settings } from '@/models/settings'
import settingsStore from '@/stores/settings'
import { storeAndSaveSelectedSettings } from '@/services/settings-management';
import { languageChoiceSectionVM } from '@/view-models/vm-settings';
import ChoiceSection from '@vueties/form/ChoiceSection.vue';

const settings = settingsStore()

const selectedSettings = ref<Settings>({
  currentLanguage: settings.currentLanguage,
  languagesSettings: settings.languagesSettings,
  minTermCountForTest: settings.minTermCountForTest
})

const choiceSectionVM = computed(() => languageChoiceSectionVM(selectedSettings.value.currentLanguage))

onBeforeUnmount(() => {
  if (selectedSettings.value != settings) {
    storeAndSaveSelectedSettings(selectedSettings.value)
  }
})
</script>

<template>
  <section class="form">
    <ChoiceSection 
      :vm="choiceSectionVM" 
      @selected="(lang: Language) => selectedSettings.currentLanguage = lang"
    />
  </section>
</template>

<style scoped lang="scss">
@use '@vueties/styles/form' with (
  $max-width: none
);
@use '@design-tokens/palette';

:deep(.representative-icon) {
  @include palette.color-attribute('color', 'tertiary-body');
}
</style>
