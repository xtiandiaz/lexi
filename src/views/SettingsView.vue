<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router';
import useSettingsStore from '@/stores/settings'
import { Language } from '@/models/localization'
import { LocalizedStringKey } from '@/models/localization';
import type { Settings } from '@/models/settings';
import { storeAndSaveSelectedSettings } from '@/services/settings-management';
import { localizedStringInLanguage } from '@/services/localization';
import { produceLanguageChoiceSectionVM } from '@/view-models/vm-settings';
import VuetyForm from '@vueties/components/form/VuetyForm.vue'
import VuetyChoiceFormSection from '@vueties/components/form/VuetyChoiceFormSection.vue';
import '@/assets/tungsten/extensions/array.extensions'
import { version } from '@/../package.json'

const route = useRoute()
const settings = useSettingsStore()

const selectedSettings = ref<Settings>({
  activeLanguages: settings.activeLanguages,
  languagesSettings: settings.languagesSettings,
  preferredLanguage: settings.preferredLanguage,
})
const selectedActiveLanguages = computed(() => selectedSettings.value.activeLanguages)

const choiceSectionVM = computed(() => 
  produceLanguageChoiceSectionVM([...selectedSettings.value.activeLanguages])
)

const title = computed(() => localizedStringInLanguage(
  LocalizedStringKey.Title_Settings, 
  selectedSettings.value.preferredLanguage
))

function onLanguageSelected(language: Language) {
  if (
    selectedActiveLanguages.value.includes(language) && 
    selectedActiveLanguages.value.length > 1
  ) {
    selectedActiveLanguages.value.remove(l => l === language)
    selectedSettings.value.preferredLanguage = selectedActiveLanguages.value.last()!
  } else {
    selectedActiveLanguages.value.push(language)
    selectedSettings.value.preferredLanguage = language
  }
}

watch(title, (newTitle) => {
  route.meta.setTitle(newTitle)
}, { immediate: true })

onBeforeUnmount(() => {  
  if (
    settings.activeLanguages !== selectedActiveLanguages.value ||
    settings.preferredLanguage !== selectedSettings.value.preferredLanguage
  ) {
    storeAndSaveSelectedSettings(selectedSettings.value)
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
