<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import historyStore from '@/stores/history'
import { Content } from '@/models/content'
import { LocalizedStringKey } from '@/models/localization'
import { Section } from '@/models/section'
import { launchResearchToolForTerm } from '@/services/tool-handler'
import { localizedString, localizedStringForTermTag } from '@/services/localization'
import { prepareTest } from '@/services/session-management'
import { dailyHistoryDateLocaleString } from '@/utils/history.utils'
import { sectionTitle } from '@/utils/section.utils'
import { isCompletedTermPassed } from '@/utils/term.utils'
import { inputMarkIcon, showsInputMarkValueForKind } from '@/view-models/vm-input'
import { Icon } from '@design-tokens/iconography'
import ResearchToolBar from '@/components/ResearchToolBar.vue'
import Form from '@vueties/components/form/VuetyForm.vue'
import FormSection from '@vueties/components/form/VuetyFormSection.vue'
import FoldableFormRow from '@vueties/components/form/rows/VuetyFoldableFormRow.vue'
import SvgIcon from '@vueties/components/misc/VuetySvgIcon.vue'
import ButtonFormRow from '@vueties/components/form/rows/VuetyButtonFormRow.vue'
import TextTag from '@/vueties/components/misc/VuetyTextTag.vue'

const emits = defineEmits<{
  viewTitle: [string?]
}>()

const history = historyStore()
const dailyHistory = history.currentDailyHistory
const termCount = dailyHistory?.completedTerms.length ?? 0

const selectedIndex = ref<number>()

function onWordSelected(index: number) {
  selectedIndex.value = index !== selectedIndex.value ? index : undefined
}

function onTestButtonClicked() {
  prepareTest()
}

onBeforeMount(() => {
  emits('viewTitle', sectionTitle(Section.DailyHistory))
})
</script>

<template>
  <main>
    <Form v-if="dailyHistory">
      <FormSection
        :title="`${dailyHistoryDateLocaleString(dailyHistory)} • ${termCount} ${localizedString(LocalizedStringKey.Word, termCount === 0 || termCount > 1)}`"
      >
        <FoldableFormRow 
          v-for="(term, index) of dailyHistory.completedTerms.sort((s1, s2) => s1.word.localeCompare(s2.word))"
          :key="index"
          :is-unfolded="selectedIndex === index"
          @selected="onWordSelected(index)"
          >
          
          <template v-slot:title>
            <div v-if="isCompletedTermPassed(term)" class="passed-background rounded-element"></div>
            
            <div class="title-wrapper">
              <span class="title">{{ term.word }}</span>
              
              <div v-if="term.extras?.tags" class="tags">
                <TextTag
                  v-for="(tag, index) of term.extras.tags"
                  :key="index"
                  :label="localizedStringForTermTag(tag)"
                  class="tiny"
                />
              </div>
              
              <div v-if="term.inputMarks && term.inputMarks.length > 0" class="marks">
                <span
                  v-for="(mark, index) of term.inputMarks.filter(m => m.value > 0)" 
                  :key="index"
                  class="mark" :class="mark.kind"
                >
                  <span v-if="showsInputMarkValueForKind(mark.kind)">{{ mark.value }} ×</span>
                  <SvgIcon :icon="inputMarkIcon(mark.kind)" />
                </span>
              </div>
            </div>
          </template>
          <template v-slot:subtitle v-if="term.aliases">
            <span class="subtitle">{{ Content.aliasesStringFromTerm(term) }}</span>
          </template>
          <template v-slot:foldable-content>
            <ResearchToolBar
              @tool-selected="(tool) => launchResearchToolForTerm(tool, term)"
            />
          </template>
        </FoldableFormRow>
      </FormSection>
      <FormSection v-if="history.canTakeTest" class="test">
        <ButtonFormRow 
          :label="localizedString(LocalizedStringKey.Button_Test)" 
          :icon="Icon.Right"
          @click="onTestButtonClicked"
        />
      </FormSection>
    </Form>
  </main>
</template>

<style scoped lang="scss">
@use '@vueties/components/buttons/styles' as button-styles;
@use '@vueties/components/form/styles' as form-styles with (
  $max-width: none
);
@use '@design-tokens/palette';
@use '@design-tokens/typography';

.row.foldable {
  position: relative;
  z-index: 1;
  
  &.unfolded {
    span.title {
      @extend .h6;
    }
  }
  
  div.passed-background {
    bottom: 1px;
    left: 1px;
    position: absolute;
    right: 1px;
    top: 1px;
    z-index: -1;
    @include palette.color-attribute('background-color', 'green', 0.1);
  }

  div.title-wrapper {
    &, > * {
      align-items: center;
      display: flex;
      flex-direction: row;
      gap: 0.5em;
    }
    
    div.tags, div.marks {
      gap: 0.25em;
    }
    
    div.tags {
      span.tag.tiny {
        @extend .italic;
      }
    }
    
    div.marks {
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
  }

  span.subtitle {
    @extend .caption;
    @include palette.color-attribute('color', 'tertiary-body');
  }
}

.test .row.button {
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
