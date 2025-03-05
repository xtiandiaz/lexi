<script setup lang="ts">
defineProps<{
  input: string,
  synonyms: string[],
  isWordCompleted: boolean
}>()
</script>

<template>
  <div id="screen" class="panel">
    <div class="fill"></div>
    <h1 class="serif">{{ input }}</h1>
    <h6 class="serif" v-if="isWordCompleted && synonyms.length > 0">{{ synonyms.join(', ') }}</h6>
  </div>
</template>

<style scoped lang="scss">

</style>
