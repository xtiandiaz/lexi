<script setup lang="ts">
import { ref } from 'vue'
import { Section } from '@/models/navigation'
import { LocalizedString } from '@/models/language'
import historyStore from '@/stores/history'
import settingsStore from '@/stores/settings'
import { launchResearchToolForWord } from '@/services/tool-handler'
import { localizedString } from '@/services/localization'
import { computedNavigationBarVM } from '@/view-models/vm-navigation'
import { inputMarkIcon } from '@/view-models/vm-input'
import { Icon } from '@/assets/design-tokens/iconography'
import NavigationBar from '@/components/vueties/bars/NavigationBar.vue'
import FoldableRow from '@/components/vueties/form/FoldableRow.vue'
import ResearchToolBar from '@/components/game/ResearchToolBar.vue'
import SvgIcon from '@/components/vueties/assorted/SvgIcon.vue'
import TextButton from '@/components/vueties/buttons/TextButton.vue'

const history = historyStore()
const settings = settingsStore()

const selectedIndex = ref<number>()
const navigationBarVM = computedNavigationBarVM(Section.DailyHistory)

function onWordSelected(index: number) {
  if (index !== selectedIndex.value) {
    selectedIndex.value = index
  } else {
    selectedIndex.value = undefined
  }
}
</script>

<template>
  <NavigationBar :vm="navigationBarVM" />
  <main>
    <section v-if="history.currentDailyHistory" class="form">
      <div v-if="history.isDailyGoalReached" class="section wrapper review">
        <SvgIcon :icon="Icon.Right" />
        {{ localizedString(LocalizedString.Text_DailyGoalReached) }}
        <span>
          <span class="strong">{{history.currentTermCount}}</span>/{{ settings.currentDailyGoal.termCount }}
        </span>
        <div class="spacer"></div>
        <!-- <TextButton :label="localizedString(LocalizedString.Button_Review)" /> -->
      </div>
      <div class="section">
        <div class="rows">
          <FoldableRow 
            v-for="(term, index) of history.currentDailyHistory.completedTerms.sort((s1, s2) => s1.baseWord.localeCompare(s2.baseWord))"
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
                <span>{{ mark.value }} ×</span><SvgIcon :icon="inputMarkIcon(mark.kind)" />
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
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '../components/vueties/assets/buttons';
@use '../components/vueties/assets/form' with (
  $max-width: 640px
);
@use '@/assets/design-tokens/palette';
@use '@/assets/design-tokens/typography';

div.marks {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  
  span.mark {
    @extend .caption;
    
    &.hints {
      @include palette.color-attribute('color', 'yellow');
    }
    &.tests {
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

.section.review {
  display: flex;
  flex-direction: row !important;
  align-items: center;
  @include palette.color-attribute('color', 'green');
  
  button.text-button {
    @include palette.color-attribute('background-color', 'green');
  }
  
  .svg-icon {
    flex-shrink: 0; 
    height: 2em;
    width: 2em;
  }
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
