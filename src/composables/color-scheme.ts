import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { ColorScheme } from '@design-tokens/palette';

export function trackColorSheme(): Ref<ColorScheme> {
  const mediaQuery = '(prefers-color-scheme: dark)'
  const colorSchemeOnMatch = (matches: boolean) => matches ? ColorScheme.Dark : ColorScheme.Light
  const currentColorScheme = ref<ColorScheme>(colorSchemeOnMatch(window.matchMedia(mediaQuery).matches))
  
  function onMatchChanged(e: MediaQueryListEvent) {
    currentColorScheme.value = colorSchemeOnMatch(e.matches)
  }
  
  onMounted(() => {
    window.matchMedia(mediaQuery).addEventListener('change', onMatchChanged)
  })
  onUnmounted(() => {
    window.matchMedia(mediaQuery).removeEventListener('change', onMatchChanged)
  })
  
  return currentColorScheme
}
