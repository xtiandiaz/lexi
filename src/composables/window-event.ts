import { onMounted, onUnmounted } from "vue";

export function onWindowEvent(key: keyof WindowEventMap, callback: (e: Event) => void) {
  onMounted(() => {
    console.log("Adding Window event:", key)
    window.addEventListener(key, callback)
  })
  onUnmounted(() => {
    console.log("Removing Window event:", key)
    window.removeEventListener(key, callback)
  })
}
