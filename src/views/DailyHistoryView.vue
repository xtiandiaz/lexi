<script setup lang="ts">
import { ref } from 'vue'
import { LocalizedStringKey } from '@/models/localization'
import useSessionStore from '@/stores/session'
import { Section } from '@/models/section'
import { localizedString } from '@/services/localization'
import VuetyForm from '@vueties/components/form/VuetyForm.vue'
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue'
import TermFoldableRow from '@/components/form/TermFoldableRow.vue'
import VuetyInfoFormRow from '@/vueties/components/form/rows/VuetyInfoFormRow.vue'
import VuetyNavigationalView from '@/vueties/views/VuetyNavigationalView.vue'
import { closeNavBarItem } from '@/vueties/components/shared/view-models'
import { sectionTitle } from '@/utils/section.utils'
import { sessionDateLocaleString } from '@/utils/session.utils'
import { obfuscatedWordHTMLFromTerm } from '@/utils/game.utils'

const session = useSessionStore()

const terms = session?.terms
const termCount = terms?.length ?? 0 // TODO: interpolate count in localized string

const selectedIndex = ref<number>()

function onTermSelected(index: number) {
  selectedIndex.value = index !== selectedIndex.value ? index : undefined
}
</script>

<template>
  <VuetyNavigationalView
    :nav-bar-items="[closeNavBarItem('/')]"
    :title="sectionTitle(Section.DailyHistory)"
  >
    <main>
      <VuetyForm v-if="session">
        <VuetyFormSection
          :title="`${sessionDateLocaleString()} • ${termCount} ${localizedString(LocalizedStringKey.Term, termCount === 0 || termCount > 1)}`"
        >
          <div 
            v-for="(term, index) of terms"
            :key="index"
          >
            <VuetyInfoFormRow 
              v-if="term.inputState"
              :title="obfuscatedWordHTMLFromTerm(term) ?? term.word"
            />
            <TermFoldableRow
              v-else
              :term="term"
              :isUnfolded="selectedIndex === index"
              @select="onTermSelected(index)"
            />
          </div>
        </VuetyFormSection>
      </VuetyForm>
    </main>
  </VuetyNavigationalView>
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;
@use '@vueties/components/buttons/styles' as button-styles;
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: none
);

#test-button-wrapper {
  padding: form-styles.$form-padding;
  padding-top: form-styles.$form-padding * 2;
  z-index: 100;
  @include vs.position(sticky, null, 0, 0, 0);
  @include vs.linear-gradient(
    0deg, 
    vs.$secondary-background-color 1 70%, 
    vs.$secondary-background-color 0 100%
  );
  
  #test-button {
    width: 100%;
    @include vs.color-attribute('color', 'green');
  }
}

.vuety-info-form-row {
  @include vs.color-attribute('color', vs.$secondary-body-color);
  
  :deep(.obfuscated) {
    opacity: 50%;
  }
}
</style>
