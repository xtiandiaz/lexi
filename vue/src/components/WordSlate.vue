<script setup lang="ts">
defineProps<{
  word?: string,
  synonyms: string[]
}>()
</script>

<template>
  <div id="slate" v-if="word !== undefined">
    <h1 class="serif">{{ word }}</h1>
    <h6 class="serif" v-if="(synonyms.length ?? 0) != 0">{{ synonyms.join(', ') }}</h6>
  </div>
</template>

<style scoped lang="scss">
#slate {
  text-align: center;
  display: block;
  margin: 0 0 2em 0;
  
  h1 {
    margin-bottom: 0.25em;
  }
  
  h6 {
    margin: 0;
  }
}
</style>
