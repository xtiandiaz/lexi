<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia';
import useSessionStore from '@/stores/session'
import useGameStore from '@/stores/game'
import { TermMarkKind } from '@/models/content';
import { ToolKey, type AnyTool } from '@/models/tools';
import { launchResearchToolForTerm } from '@/services/tool-handler';
import { prepareSession, resetSessionIfNeeded, saveSession, updateSession } from '@/services/session-management';
import ExplorationControls from '@/components/ExplorationControls.vue';
import InputKeypad from '@/components/InputKeypad.vue';
import TermSlideshow from '@/components/TermCarousel.vue';
import { clueAtTerm, inputStringsFromState } from '@/utils/input.utils'
import { getDeckStateFromTerms, markTerm } from '@/utils/game.utils'
import { clamp } from '@/assets/tungsten/math';
import { Icon } from '@/assets/design-tokens/iconography';
import VuetyNavigationalView from '@/vueties/views/VuetyNavigationalView.vue';
import { navBarItem } from '@/vueties/components/shared/view-models';
import '@/assets/tungsten/extensions/array.extensions'
import { useEvents } from '@/vueties/composables/events';

const session = useSessionStore()
const store = useGameStore()

const { settings } = storeToRefs(store)
const { activeTerms: terms } = storeToRefs(session)

const currentTermIndex = computed({
  get: () => session.currentTermIndex ?? 0,
  set: (val) => session.currentTermIndex = val
})
const currentTerm = computed(() => terms.value?.[currentTermIndex.value])
const deckState = computed(() => terms.value ? getDeckStateFromTerms(terms.value) : undefined)

const inputState = computed(() => currentTerm.value?.inputState)

function goToCard(index: number) {
  if (terms.value) {
    currentTermIndex.value = clamp(index, 0, terms.value.length - 1)
  }
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

async function onPageUnfocusedOrUnmounted() {
  console.log("Game View unfocused or unmounted...")
  
  await resetSessionIfNeeded()
}

watch(inputState, (newInputState) => {
  if (newInputState == undefined) {
    return
  }
  const inputStrings = inputStringsFromState(newInputState)
  
  if (inputStrings.input === inputStrings.inputable && currentTerm.value) {
    currentTerm.value.inputState = undefined
    
    saveSession()
  }
}, { deep: true })

watch(currentTermIndex, () => {
  saveSession()
})

watch(settings, async () => {
  await updateSession()
}, { deep: true })

onMounted(async () => {
  await prepareSession()
})

useEvents(['blur', 'beforeunload', 'pagehide'], window, onPageUnfocusedOrUnmounted)
</script>

<template>
  <VuetyNavigationalView
    :nav-bar-items="[
      navBarItem('/settings', -1, undefined, Icon.Gear),
      navBarItem('/daily-summary', 1, undefined, Icon.Listing, (deckState?.solvedCount ?? 0) > 0),
    ]"
  >
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
        :stepCount="terms.length"
        @previous="goToCard(currentTermIndex - 1)"
        @next="goToCard(currentTermIndex + 1)"
      />
    </main>
  </VuetyNavigationalView>
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
