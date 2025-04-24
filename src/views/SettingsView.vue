<script setup lang="ts">
import { ref, computed, onBeforeMount, onBeforeUnmount } from 'vue';
import settingsStore from '@/stores/settings'
import type { Language } from '@/models/language'
import { type Settings } from '@/models/settings'
import { Section } from '@/models/section'
import { sectionTitle } from '@/utils/section.utils'
import { storeAndSaveSelectedSettings } from '@/services/settings-management';
import { version } from '@/../package.json'
import { languageChoiceSectionVM } from '@/view-models/vm-settings';
import ChoiceSection from '@vueties/form/ChoiceSection.vue';

const emits = defineEmits<{
  viewTitle: [string?]
}>()

const settings = settingsStore()

const selectedSettings = ref<Settings>({
  currentLanguage: settings.currentLanguage,
  languagesSettings: settings.languagesSettings,
  minTermCountForTest: settings.minTermCountForTest
})

const choiceSectionVM = computed(() => languageChoiceSectionVM(selectedSettings.value.currentLanguage))

onBeforeMount(() => {
  emits('viewTitle', sectionTitle(Section.Settings))
})

onBeforeUnmount(() => {
  if (selectedSettings.value != settings) {
    storeAndSaveSelectedSettings(selectedSettings.value)
  }
})
</script>

<template>
  <main>
    <section class="form">
      <ChoiceSection 
        :vm="choiceSectionVM" 
        @selected="(lang: Language) => selectedSettings.currentLanguage = lang"
      />
    </section>
    <span class='version'>v{{ version }}</span>
  </main>
</template>

<style scoped lang="scss">
@use '@vueties/styles/form' with (
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
