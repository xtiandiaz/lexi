<script setup lang="ts">
import { ref } from 'vue'
import historyStore from '@/stores/history'
import { LocalizedStringKey } from '@/models/localization'
import { localizedString } from '@/services/localization'
import { prepareTest } from '@/services/session-management'
import CompletedTermFoldableRow from '@/components/CompletedTermFoldableRow.vue'
import Form from '@vueties/components/form/VuetyForm.vue'
import FormSection from '@vueties/components/form/VuetyFormSection.vue'
import VuetyTextButton from '@/vueties/components/buttons/VuetyTextButton.vue'
import { dailyHistoryDateLocaleString } from '@/utils/history.utils'
import { Icon } from '@design-tokens/iconography'

const history = historyStore()
const dailyHistory = history.currentDailyHistory
const termCount = dailyHistory?.completedTerms.length ?? 0

const selectedIndex = ref<number>()

function onTermSelected(index: number) {
  selectedIndex.value = index !== selectedIndex.value ? index : undefined
}

function onTestButtonClicked() {
  prepareTest()
}
</script>

<template>
  <main>
    <Form v-if="dailyHistory">
      <FormSection
        :title="`${dailyHistoryDateLocaleString(dailyHistory)} • ${termCount} ${localizedString(LocalizedStringKey.Term, termCount === 0 || termCount > 1)}`"
      >
        <CompletedTermFoldableRow
          v-for="(term, index) of dailyHistory.completedTerms.sort((s1, s2) => s1.word.localeCompare(s2.word))"
          :key="index"
          :term="term"
          :isUnfolded="selectedIndex === index"
          @selected="onTermSelected(index)"
        />
      </FormSection>
    </Form>
    
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
@use '@vueties/utils/mixins';
@use '@vueties/components/buttons/styles' as button-styles;
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: none
);
@use '@design-tokens/palette';
@use '@design-tokens/typography';

#test-button-wrapper {
  bottom: 0;
  left: 0;
  padding: form-styles.$form-padding;
  padding-top: form-styles.$form-padding * 2;
  position: sticky;
  right: 0;
  z-index: 100;
  @include mixins.linear-gradient(
    0deg, 
    'secondary-background' 1 70%, 
    'secondary-background' 0 100%
  );
  
  #test-button {
    width: 100%;
    @include palette.color-attribute('color', 'green');
  }
}
</style>
