<script setup lang="ts">
import { ref } from 'vue'
import { Section } from '@/models/navigation'
import dailyHistoryStore from '@/stores/history'
import { launchResearchToolForWord } from '@/services/tool-handler'
import { computedNavigationBarVM } from '@/view-models/vm-navigation'
import NavigationBar from '@/components/vueties/bars/NavigationBar.vue'
import FoldableRow from '@/components/vueties/form/FoldableRow.vue'
import ResearchToolBar from '@/components/game/ResearchToolBar.vue'
import SvgIcon from '@/components/vueties/assorted/SvgIcon.vue'
import { Icon } from '@/assets/design-tokens/iconography'

const history = dailyHistoryStore()

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
  <NavigationBar :vm="navigationBarVM" :title="navigationBarVM.title" />
  <main>
    <section class="form">
      <div class="section">
        <FoldableRow 
          v-for="(term, index) of history.daily.completedTerms.sort((s1, s2) => s1.baseWord.localeCompare(s2.baseWord))"
          :key="index"
          :title="term.baseWord"
          :subtitle="term.linkedWords.join(', ')"
          :is-unfolded="selectedIndex === index"
          @selected="onWordSelected(index)"
        >
        <template v-slot:title-ornament>
          <div class="marks">
            <span 
              v-if="term.hintCount > 0"
              class="mark hint-count"
            >
              <span>{{ term.hintCount }} ×</span><SvgIcon :icon="Icon.Hint" />
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
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/design-tokens/palette';
@use '@/assets/design-tokens/typography';
@use '../components/vueties/assets/form' with (
  $max-width: 640px
);

main {
  padding: 0.5em 1em;
}

div.marks {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  
  span.mark {
    @extend .caption;
    
    &.hint-count {
      @include palette.color-attribute('color', 'yellow');
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

:deep(.tool-bar) {
  flex: auto;
  justify-content: space-between;
  
  button.icon-button .svg-icon {
    height: 1.75em;
    width: 1.75em;
  }
}
</style>
