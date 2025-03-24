<script setup lang="ts">
import { Section } from '@/models/navigation'
import settingsStore from '@/stores/settings'
import { resetCurrentLanguage } from '@/services/settings-management';
import { computedNavigationBarVM } from '@/view-models/vm-navigation';
import { languageChoiceSectionVM } from '@/view-models/vm-settings';
import NavigationBar from '@/components/vueties/bars/NavigationBar.vue';
import ChoiceSection from '@/components/vueties/form/ChoiceSection.vue';
import { computed } from 'vue';

const settings = settingsStore()

const navigationBarVM = computedNavigationBarVM(Section.Settings)
const choiceSectionVM = computed(() => languageChoiceSectionVM(settings.currentLanguage))
</script>

<template>
  <NavigationBar :vm="navigationBarVM" />
  <main>
    <section class="form">
      <ChoiceSection 
        :vm="choiceSectionVM" 
        @selected="(lang) => resetCurrentLanguage(lang)"
      />
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/design-tokens/palette';
@use '@/components/vueties/assets/form' with (
  $max-width: 640px
);

:deep(.representative-icon) {
  @include palette.color-attribute('color', 'tertiary-body');
}
</style>
