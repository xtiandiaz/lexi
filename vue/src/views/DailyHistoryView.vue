<script setup lang="ts">
import { ref } from 'vue'
import { capitalCase } from 'change-case'
import { Section } from '@/models/navigation'
import { computedNavigationBarVM } from '@/view-models/vm-navigation'
import dailyHistoryStore from '@/stores/history'
import { launchResearchToolForWord } from '@/services/tool-handler'
import NavigationBar from '@/components/vueties/bars/NavigationBar.vue'
import FoldableRow from '@/components/vueties/form/FoldableRow.vue'
import ResearchToolBar from '@/components/game/ResearchToolBar.vue'

const dailyHistory = dailyHistoryStore()

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
          v-for="(word, index) of dailyHistory.words.sort((s1, s2) => s1.localeCompare(s2))"
          :key="index"
          :title="capitalCase(word.split(',')[0])"
          :is-unfolded="selectedIndex === index"
          @selected="onWordSelected(index)"
        >
        <ResearchToolBar
          @tool-selected="(tool) => launchResearchToolForWord(tool, word)"
        />
        </FoldableRow>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '../components/vueties/assets/form';

main {
  padding: 1em;
}
</style>
