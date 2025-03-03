<script setup lang="ts">
defineProps<{
  word?: string,
  synonyms: string[]
}>()
</script>

<template>
  <div id="slate" class="panel" v-if="word !== undefined">
    <div class="fill"></div>
    <h1 class="serif">{{ word }}</h1>
    <h6 class="serif" v-if="(synonyms.length ?? 0) != 0">{{ synonyms.join(', ') }}</h6>
  </div>
</template>

<style scoped lang="scss">

</style>
