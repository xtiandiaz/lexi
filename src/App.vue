<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useContentStore from '@/stores/content'
import VuetyProgressIndicator from '@vueties/components/misc/VuetyProgressIndicator.vue';
import VuetyScene from '@vueties/scenes/VuetyScene.vue'
import { Language } from './models/localization'

const content = useContentStore()

const isLoading = ref(true)

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
