<script setup lang="ts">
import { Language, LocalizedString } from '@/models/language'
import { Section } from '@/models/navigation'
import settingsStore from '@/stores/settings'
import { localizedStringInLanguage } from '@/services/localization';
import { resetCurrentLanguage } from '@/services/settings-management';
import { computedNavigationBarVM } from '@/view-models/vm-navigation';
import NavigationBar from '@/components/vueties/bars/NavigationBar.vue';
import OptionRow from '@/components/vueties/form/OptiionRow.vue';

const settings = settingsStore()

const navigationBarVM = computedNavigationBarVM(Section.Settings)
</script>

<template>
  <NavigationBar :vm="navigationBarVM" />
  <main>
    <section class="form">
      <div class="section">
        <OptionRow 
          v-for="lang of Object.values(Language)"
          :key="lang"
          :vm="{
            title: localizedStringInLanguage(LocalizedString.LanguageName, lang)!,
            value: lang
          }"
          :isSelected="lang === settings.currentLanguage"
          @selected="(lang) => resetCurrentLanguage(lang)"
          class="row info"
        />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '@/components/vueties/assets/form' with (
  $max-width: 640px
)

</style>
