<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import { trackColorSheme } from '@/composables/color-scheme'
import { Color, schemeColor } from '@design-tokens/palette'
import { hexString } from '@/assets/tungsten/stringify'

const currentColorScheme = trackColorSheme()

function updateThemeColor() {
  const metaTag = document.getElementById('themeColorMetaTag')
  const colorString = hexString(schemeColor(currentColorScheme.value, Color.Background))
  
  metaTag?.setAttribute('content', colorString)
}

watch(() => currentColorScheme, () => {
  updateThemeColor()
})

onMounted(() => {
  document.ondblclick = (e) => e.preventDefault()
  
  updateThemeColor()
})
</script>

<template>
  <RouterView />
</template>
