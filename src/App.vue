<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Section } from '@/models/section'
import { GameMode } from '@/models/game'
import useGameStore from '@/stores/game'
import useContentStore from '@/stores/content.store'
import type { VuetyNavigationBarVM } from '@vueties/components/bars/view-models'
import VuetyProgressIndicator from '@vueties/components/misc/VuetyProgressIndicator.vue';
import VuetyScene from '@vueties/scenes/VuetyScene.vue'
import { Icon } from '@design-tokens/iconography'
import VuetyNavigationalView from '@vueties/views/VuetyNavigationalView.vue'
import { Language } from './models/localization'

const game = useGameStore()
const content = useContentStore()

const isLoading = ref(true)

const navigationBarVM = computed<VuetyNavigationBarVM>(() => {
  return {
    isVisible: game.mode === GameMode.Exploration,
    leftBarItems: [
      {
        icon: Icon.Gear,
        path: `/${Section.Settings}`
      },
      // {
      //   icon: Icon.MagnifyingGlass,
      //   isEnabled: game.inputState?.isComplete === true,
      //   path: `/${Section.Search}`
      // }
    ],
    // rightBarItems: [
    //   {
    //     icon: Icon.Listing,
    //     isEnabled: session.explorationExtent > 0,
    //     label: `${session.explorationExtent}`,
    //     path: `/${Section.DailyHistory}`
    //   }
    // ]
  }
})

onMounted(async () => {
  await content.load(Object.values(Language))
  
  isLoading.value = false
})

</script>

<template>
  <VuetyProgressIndicator v-if="isLoading" />
  <VuetyScene v-else />
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;

.vuety-progress-indicator {
  margin: auto;
  @include vs.size(3rem);
  @include vs.position(absolute, 0, 0, 0, 0);
}
</style>
