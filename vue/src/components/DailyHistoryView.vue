<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { Section } from '@/models/navigation'
import { LocalizedString } from '@/models/language'
import historyStore from '@/stores/history'
import settingsStore from '@/stores/settings'
import { launchResearchToolForWord } from '@/services/tool-handler'
import { localizedString } from '@/services/localization'
import { prepareTest } from '@/services/session-management'
import { computedNavigationBarVM } from '@/view-models/vm-navigation'
import { inputMarkIcon, shouldShowInputMarkValue } from '@/view-models/vm-input'
import { Icon } from '@design-tokens/iconography'
import ResearchToolBar from '@/components/ResearchToolBar.vue'
import NavigationBar from '@vueties/bars/NavigationBar.vue'
import FoldableRow from '@vueties/form/FoldableRow.vue'
import SvgIcon from '@vueties/misc/SvgIcon.vue'
import ButtonRow from '@vueties/form/ButtonRow.vue'

const settings = settingsStore()

const history = historyStore()
const dailyHistory = history.currentDailyHistory
const termCount = dailyHistory?.completedTerms.length ?? 0
const dateLocaleString = (new Date()).toLocaleDateString(settings.currentLanguage, {
  month: 'long',
  day: 'numeric'
})

const selectedIndex = ref<number>()
const navigationBarVM = computedNavigationBarVM(Section.DailyHistory)

function onWordSelected(index: number) {
  selectedIndex.value = index !== selectedIndex.value ? index : undefined
}

function onTestButtonClicked() {
  prepareTest()
  router.back()
}
</script>

<template>
  <NavigationBar :vm="navigationBarVM" class="filled" />
  <main>
    <section v-if="dailyHistory" class="form">
      <div class="section">
        <div class="header inline">
          <span class="title">{{ dateLocaleString }}</span>
          •
          <span class="subtitle">{{ `${termCount} ${localizedString(LocalizedString.Word, termCount > 1)}` }}</span>
        </div>
        <div class="rows">
          <FoldableRow 
            v-for="(term, index) of dailyHistory.completedTerms.sort((s1, s2) => s1.baseWord.localeCompare(s2.baseWord))"
            :key="index"
            :title="term.baseWord"
            :subtitle="term.linkedWords.join(', ')"
            :is-unfolded="selectedIndex === index"
            @selected="onWordSelected(index)"
          >
          <template v-slot:title-ornament>
            <div v-if="term.inputMarks && term.inputMarks.length > 0" class="marks">
              <span
                v-for="(mark, index) of term.inputMarks.filter(m => m.value > 0)" 
                :key="index"
                class="mark" :class="mark.kind"
              >
                <span v-if="shouldShowInputMarkValue(mark.kind)">{{ mark.value }} ×</span><SvgIcon :icon="inputMarkIcon(mark.kind)" />
              </span>
            </div>
          </template>
          <template v-slot:foldable-content>
            <ResearchToolBar
              @tool-selected="(tool) => launchResearchToolForWord(tool, term.baseWord)"
            />
          </template>
          </FoldableRow>
        </div>
      </div>
      <div v-if="history.canReview" class="section review">
        <div class="rows">
          <ButtonRow 
            :label="localizedString(LocalizedString.Button_Test)" 
            :icon="Icon.Right"
            @click="onTestButtonClicked"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '@vueties/styles/buttons';
@use '@vueties/styles/form' with (
  $max-width: 640px
);
@use '@design-tokens/palette';
@use '@design-tokens/typography';

div.marks {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  
  span.mark {
    @extend .caption;
    
    &.hint {
      @include palette.color-attribute('color', 'yellow');
    }
    &.test {
      @include palette.color-attribute('color', 'green');
    }
    
    > * {
      vertical-align: middle;
    }
    
    .svg-icon {
      height: 1.25em;
      width: 1.25em;
    }
  }  
}

.review .row.button {
  @include palette.color-attribute('color', 'green');
}

:deep(.tool-bar) {
  flex: auto;
  justify-content: space-between;
  
  button.icon-button .svg-icon {
    height: 1.75em;
    width: 1.75em;
  }
}
</style>
