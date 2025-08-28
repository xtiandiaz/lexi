<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { LocalizedStringKey } from '@/models/localization'
import historyStore from '@/stores/history'
import { Section } from '@/models/section'
import { localizedString } from '@/services/localization'
// import { prepareTest } from '@/services/session-management'
import CompletedTermFoldableRow from '@/components/form/CompletedTermFoldableRow.vue'
import VuetyForm from '@vueties/components/form/VuetyForm.vue'
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue'
import VuetyTextButton from '@/vueties/components/buttons/VuetyTextButton.vue'
import { dailyHistoryDateLocaleString } from '@/utils/history.utils'
import { sectionTitle } from '@/utils/section.utils'
import { Icon } from '@design-tokens/iconography'

const route = useRoute()

const history = historyStore()
const dailyHistory = history.dailyHistory

const terms = dailyHistory?.terms.sort((s1, s2) => s1.word.localeCompare(s2.word))
const termCount = terms?.length ?? 0 // TODO: interpolate count in localized string

const selectedIndex = ref<number>()

function onTermSelected(index: number) {
  selectedIndex.value = index !== selectedIndex.value ? index : undefined
}

function onTestButtonClicked() {
  // prepareTest()
}

onBeforeMount(() => {
  route.meta.setTitle(sectionTitle(Section.DailyHistory))
})
</script>

<template>
  <main>
    <VuetyForm v-if="dailyHistory">
      <VuetyFormSection
        :title="`${dailyHistoryDateLocaleString(dailyHistory)} • ${termCount} ${localizedString(LocalizedStringKey.Term, termCount === 0 || termCount > 1)}`"
      >
        <CompletedTermFoldableRow
          v-for="(term, index) of terms"
          :key="index"
          :term="term"
          :isUnfolded="selectedIndex === index"
          @select="onTermSelected(index)"
        />
      </VuetyFormSection>
    </VuetyForm>
    
    <div id="test-button-wrapper">
      <VuetyTextButton
        v-if="history.canTakeTest"
        id="test-button"
        :label="localizedString(LocalizedStringKey.Button_Test)"
        :icon="Icon.CheckmarkCircleFilled"
        @click="onTestButtonClicked"
      />
    </div>
  </main>
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
</style>
