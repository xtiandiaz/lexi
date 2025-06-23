<script setup lang="ts">
import { ref, computed, onBeforeUnmount, inject } from 'vue'
import { useRoute } from 'vue-router'
import settingsStore from '@/stores/settings'
import { Language } from '@/models/language'
import { type Settings } from '@/models/settings'
import { LocalizedStringKey } from '@/models/localization';
import { storeAndSaveSelectedSettings } from '@/services/settings-management';
import { localizedStringInLanguage } from '@/services/localization';
import { languageChoiceSectionVM } from '@/view-models/vm-settings';
import VuetyForm from '@vueties/components/form/VuetyForm.vue'
import ChoiceFormSection from '@vueties/components/form/VuetyChoiceFormSection.vue';
import { version } from '@/../package.json'

const route = useRoute()

const settings = settingsStore()

const selectedSettings = ref<Settings>({
  currentLanguage: settings.currentLanguage,
  languagesSettings: settings.languagesSettings,
  minTermCountForTest: settings.minTermCountForTest
})

const choiceSectionVM = computed(() => languageChoiceSectionVM(selectedSettings.value.currentLanguage))

function onLanguageSelected(language: Language) {
  selectedSettings.value.currentLanguage = language
  
  route.meta.title!.value = localizedStringInLanguage(LocalizedStringKey.Title_Settings, language)
}

onBeforeUnmount(() => {  
  if (selectedSettings.value != settings) {
    storeAndSaveSelectedSettings(selectedSettings.value)
  }
})
</script>

<template>
  <main>
    <VuetyForm>
      <ChoiceFormSection 
        :vm="choiceSectionVM" 
        @selected="onLanguageSelected"
      />
    </VuetyForm>
    <span class='version'>v{{ version }}</span>
  </main>
</template>

<style scoped lang="scss">
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: none
);
@use '@design-tokens/palette';
@use '@design-tokens/typography';

main {
  text-align: center;
  
  .version {
    @extend .caption;
    @include palette.color-attribute('color', 'tertiary-body');
  }
}

:deep(.representative-icon) {
  @include palette.color-attribute('color', 'tertiary-body');
}
</style>
