<script setup lang="ts">
import { ref, computed, onBeforeUnmount, onBeforeMount } from 'vue'
import settingsStore from '@/stores/settings'
import { Language } from '@/models/localization'
import { LocalizedStringKey } from '@/models/localization';
import { storeAndSaveSelectedSettings } from '@/services/settings-management';
import { localizedStringInLanguage } from '@/services/localization';
import { produceLanguageChoiceSectionVM } from '@/view-models/vm-settings';
import VuetyForm from '@vueties/components/form/VuetyForm.vue'
import VuetyChoiceFormSection from '@vueties/components/form/VuetyChoiceFormSection.vue';
import { version } from '@/../package.json'

const emits = defineEmits<{
  setSceneTitle: [string?]
}>()

const settings = settingsStore()

const selectedLanguages = ref<Set<Language>>(new Set(settings.activeLanguages))
const preferredLanguage = ref<Language>(settings.preferredLanguage)

const choiceSectionVM = computed(() => produceLanguageChoiceSectionVM([...selectedLanguages.value]))

function onLanguageSelected(language: Language) {
  if (selectedLanguages.value.has(language) && selectedLanguages.value.size > 1) {
    selectedLanguages.value.delete(language)
  } else {
    selectedLanguages.value.add(language)
    preferredLanguage.value = language
  }
  
  setTitle()
}

function setTitle() {
  emits('setSceneTitle', localizedStringInLanguage(
    LocalizedStringKey.Title_Settings, 
    preferredLanguage.value
  ))
}

onBeforeMount(() => {
  setTitle()
})

onBeforeUnmount(() => {
  const _selectedLanguages = [...selectedLanguages.value].sort()
  
  if (_selectedLanguages !== settings.activeLanguages.sort()) {
    storeAndSaveSelectedSettings(_selectedLanguages, preferredLanguage.value)
  }
})
</script>

<template>
  <main>
    <VuetyForm>
      <VuetyChoiceFormSection 
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
