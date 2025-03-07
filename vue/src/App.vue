<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

document.ondblclick = function (e) {
    e.preventDefault();
}
</script>

<template>
  <RouterView />
</template>
