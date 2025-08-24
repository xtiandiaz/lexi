<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onBeforeMount, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia';
import useGameStore from '@/stores/game'
import useSessionStore from '@/stores/session.store'
import { TermMarkKind } from '@/models/content.models';
import { ToolKey, type AnyTool } from '@/models/tools';
import { launchResearchToolForTerm } from '@/services/tool-handler';
import ExplorationControls from '@/components/ExplorationControls.vue';
import InputKeypad from '@/components/InputKeypad.vue';
import TermSlideshow from '@/components/TermSlideshow.vue';
import { clueAtTerm, inputStringsFromState } from '@/utils/input.utils'
import { markTerm } from '@/utils/game.utils'
import '@/assets/tungsten/extensions/array.extensions'
import { clamp } from '@/assets/tungsten/math';
import { Section } from '@/models/section';
import { Icon } from '@/assets/design-tokens/iconography';
import useNavigationStore from '@/vueties/stores/navigation.store';

const route = useRoute()
const navigation = useNavigationStore()

const session = useSessionStore()

const { terms, currentTermIndex } = storeToRefs(session)

const currentTerm = computed(() => terms.value?.[currentTermIndex.value])
const inputState = computed(() => currentTerm.value?.inputState)

function goToSlide(index: number) {
  currentTermIndex.value = clamp(index, 0, terms.value.length - 1)
}

function input(index: number) {  
  const inputState = currentTerm.value?.inputState
  if (!inputState) {
    return
  }
  
  if (index < 0) {
    inputState.indices.pop()
  } else {
    inputState.indices.push(index)
  }
}

function useTool(tool: AnyTool) {
  if (!currentTerm.value) {
    return
  }
  
  switch (tool.key) {
    case ToolKey.Clue:
      if (clueAtTerm(currentTerm.value)) {
        markTerm({ kind: TermMarkKind.Clue, value: 1 }, currentTerm.value)
      }
      break
    default:
      launchResearchToolForTerm(tool, currentTerm.value)
  }
}

watch(inputState, (newInputState) => {
  if (newInputState != undefined) {
    const inputStrings = inputStringsFromState(newInputState)
    
    if (inputStrings.input === inputStrings.inputable && currentTerm.value) {
      currentTerm.value.inputState = undefined
    }
  }
}, { deep: true })

watch(terms, (newTerms) => {
  console.log(newTerms)
  // session.
  // goToSlide(Math.min(currentTermIndex.value, newTerms.length - 1))
}, { immediate: true })

onBeforeMount(() => {
  navigation.barItems = [
    { key: Section.Settings, icon: Icon.Gear, path: '/settings', position: -1 }
  ]
})

onMounted(async () => {
  await session.resetTerms()
})
</script>

<template>
  <main v-if="terms">
    <TermSlideshow 
      v-if="currentTerm"
      :currentTerm="currentTerm"
      :index="currentTermIndex"
      @useTool="useTool"
    />
      
    <div class="flex-spacer"></div>
    
    <InputKeypad 
      v-if="inputState"
      :inputState="inputState"
      @input="input"
    />
    <ExplorationControls
      v-else
      :currentStep="currentTermIndex + 1"
      :stepCount="session.explorationExtent"
      @goPrevious="goToSlide(currentTermIndex - 1)"
      @goNext="goToSlide(currentTermIndex + 1)"
    />
  </main>
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;

main {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 1rem;
  position: relative;
}

#listing-button {
  @include vs.position(absolute, 0.25rem, 0.25rem);
}

.background {
  @include vs.color-attribute('background-color', 'orange');
  @include vs.position(fixed, 0, 0, 0, 0);
}
</style>
