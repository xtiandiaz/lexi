<script setup lang="ts">
import type { Route } from '@/plugins/hash-router';

defineProps<{
  route: Route
  title?: string
}>()

// const emits = defineEmits<{
//   intendedToClose: [Key]
// }>()
</script>

<template>
  <component :is="route.view"></component>
</template>

<style scoped lang="scss">
</style>
