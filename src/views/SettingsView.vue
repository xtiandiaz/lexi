<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { Language } from '@/models/localization'
import { LocalizedStringKey } from '@/models/localization';
import type { Settings } from '@/models/game';
import useGameStore from '@/stores/game'
import { storeAndSaveSelectedSettings } from '@/services/settings-management';
import { localizedStringInLanguage } from '@/services/localization';
import type { VuetySelectionOption } from '@/vueties/components/shared/view-models';
import VuetyForm from '@vueties/components/form/VuetyForm.vue'
import VuetySelectionFormSection from '@/vueties/components/form/VuetySelectionFormSection.vue';
import VuetyFormSection from '@/vueties/components/form/VuetyFormSection.vue';
import VuetyStepperFormRow from '@/vueties/components/form/rows/VuetyStepperFormRow.vue';
import VuetyNavigationalView from '@/vueties/views/VuetyNavigationalView.vue';
import { languagesOrderedByName, dictionaryIcon } from '@/utils/localization.utils';
import '@/assets/tungsten/extensions/array.extensions'
import { version } from '@/../package.json'
import { Icon } from '@/assets/design-tokens/iconography';
import { cloneSettings, settingsAreEqual } from '@/utils/settings.utils';
import { closeNavBarItem } from '@/vueties/components/shared/view-models';

const settings = useGameStore().settings

const selectedSettings = ref<Settings>(cloneSettings())
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

const localizedString = (key: LocalizedStringKey) => localizedStringInLanguage(key, preferredLanguage.value)

onBeforeUnmount(() => {
  if (!settingsAreEqual(settings, selectedSettings.value)) {
    storeAndSaveSelectedSettings(selectedSettings.value)
  }
})
</script>

<template>
  <VuetyNavigationalView
    :nav-bar-items="[closeNavBarItem('/')]"
    :title="localizedStringInLanguage(LocalizedStringKey.Title_Settings, preferredLanguage)"
  >
    <main>
      <VuetyForm>
        <VuetySelectionFormSection 
          :choices="selectedLanguages"
          :icon="Icon.Globe"
          :options="languageOptions"
          :minimumChoiceCount="1"
          :title="localizedString(LocalizedStringKey.Title_Languages)"
          @deselect="(lang) => selectedLanguages.remove((l) => l === lang)"
          @select="(lang) => selectedLanguages.push(lang)"
        />
        
        <VuetyFormSection 
          :icon="Icon.DailyGoal"
          :title="localizedString(LocalizedStringKey.Title_DailyGoal)"
        >
          <VuetyStepperFormRow
            :title="localizedString(LocalizedStringKey.Term).capitalized()"
            :initialValue="selectedSettings.dailyGoal.termCount"
            :range="{ min: 5, max: 50 }"
            :step="5"
            @setValue="value => selectedSettings.dailyGoal.termCount = value"
          />
        </VuetyFormSection>
      </VuetyForm>
      <span class='version caption'>v{{ version }}</span>
    </main>
  </VuetyNavigationalView>
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: none
);

main {
  margin-bottom: 1rem;
  text-align: center;
  
  .version {
    @include vs.color-attribute('color', vs.$tertiary-body-color);
  }
}

:deep(.representative-icon) {
  @include vs.color-attribute('color', vs.$tertiary-body-color);
}
</style>
