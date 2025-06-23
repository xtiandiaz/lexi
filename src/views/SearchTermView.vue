<script setup lang="ts">
import sessionStore from '@/stores/session';
import VuetySearchView from '@/vueties/views/VuetySearchView.vue'

const session = sessionStore()

defineProps<{
  term?: string
}>()
</script>

<template>
  <VuetySearchView 
    :placeholder="`E.g., ${session.content?.getRandomRawTerms(3)?.join(', ')}, ...`"
    :input="term"
  >
  
  </VuetySearchView>
</template>

<style scoped lang="scss">

</style>
