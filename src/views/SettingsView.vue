<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import settingsStore from '@/stores/settings'
import { Language } from '@/models/language'
import { type Settings } from '@/models/settings'
import { storeAndSaveSelectedSettings } from '@/services/settings-management';
// import { localizedStringInLanguage } from '@/services/localization';
import { version } from '@/../package.json'
import { languageChoiceSectionVM } from '@/view-models/vm-settings';
import Form from '@vueties/components/form/VuetyForm.vue'
import ChoiceFormSection from '@vueties/components/form/VuetyChoiceFormSection.vue';
// import { LocalizedStringKey } from '@/models/localization';
// import { useRoute, useRouter } from 'vue-router';

const settings = settingsStore()
// const route = useRoute()
// const router = useRouter()

const selectedSettings = ref<Settings>({
  currentLanguage: settings.currentLanguage,
  languagesSettings: settings.languagesSettings,
  minTermCountForTest: settings.minTermCountForTest
})

const choiceSectionVM = computed(() => languageChoiceSectionVM(selectedSettings.value.currentLanguage))

function reflectLanguageSelection() {
  // const title = localizedStringInLanguage(
  //   LocalizedStringKey.Title_Settings, 
  //   selectedSettings.value.currentLanguage
  // )
  
  // route.meta.title = title ???
}

watch(selectedSettings, () => {
  reflectLanguageSelection()
}, { 
  deep: true
})

onBeforeUnmount(() => {
  if (selectedSettings.value != settings) {
    storeAndSaveSelectedSettings(selectedSettings.value)
  }
})
</script>

<template>
  <main>
    <Form>
      <ChoiceFormSection 
        :vm="choiceSectionVM" 
        @selected="(lang: Language) => selectedSettings.currentLanguage = lang"
      />
    </Form>
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
