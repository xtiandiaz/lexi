<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router';
import { Language } from '@/models/localization'
import { LocalizedStringKey } from '@/models/localization';
import type { Settings } from '@/models/settings';
import useGameStore from '@/stores/game'
import { storeAndSaveSelectedSettings } from '@/services/settings-management';
import { localizedStringInLanguage } from '@/services/localization';
import type { VuetySelectionOption } from '@/vueties/components/shared.vm';
import VuetyForm from '@vueties/components/form/VuetyForm.vue'
import VuetySelectionFormSection from '@/vueties/components/form/VuetySelectionFormSection.vue';
import { languagesOrderedByName, dictionaryIcon } from '@/utils/localization.utils';
import '@/assets/tungsten/extensions/array.extensions'
import { version } from '@/../package.json'

const route = useRoute()
const settings = useGameStore().settings

const selectedSettings = ref<Settings>({ ...settings })
const selectedLanguages = computed(() => selectedSettings.value.activeLanguages)
const preferredLanguage = computed(() => selectedLanguages.value.last()!)

const languageOptions = computed<VuetySelectionOption<Language>[]>(() => {
  return languagesOrderedByName().map(lang => {
    return {
      title: lang.name,
      value: lang.key,
      icon: dictionaryIcon(lang.key)
    }
  })
})

watch(preferredLanguage, (lang) => {
  route.meta.setTitle(localizedStringInLanguage(LocalizedStringKey.Title_Settings, lang))
}, { immediate: true })

onBeforeUnmount(() => {  
  if (settings !== selectedSettings.value) {
    storeAndSaveSelectedSettings(selectedSettings.value)
  }
})
</script>

<template>
  <main>
    <VuetyForm>
      <VuetySelectionFormSection 
        :title="localizedStringInLanguage(LocalizedStringKey.Title_Languages, preferredLanguage)"
        :choices="selectedLanguages"
        :options="languageOptions"
        :minimumChoiceCount="1"
        @deselect="(lang) => selectedLanguages.removeFirst((l) => l === lang)"
        @select="(lang) => selectedLanguages.push(lang)"
      />
    </VuetyForm>
    <span class='version caption'>v{{ version }}</span>
  </main>
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: none
);

main {
  text-align: center;
  
  .version {
    @include vs.color-attribute('color', vs.$tertiary-body-color);
  }
}

:deep(.representative-icon) {
  @include vs.color-attribute('color', vs.$tertiary-body-color);
}
</style>
