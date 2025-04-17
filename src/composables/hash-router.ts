import { onMounted, onUnmounted, ref, type Ref } from "vue";
import { enumKeyFromValue } from "@/assets/tungsten/enum";

// export class HashRouter<Page extends Record<keyof Page, string>> {
//   readonly currentPage: Page
  
//   constructor(pageType: Page, startPage: Page) {
//     this.currentPage = startPage
//   }
// }

// export function setupHashRouter<Page extends Record<keyof Page, string>>(
//   pageType: Page,
//   startPage: Page,
//   notFoundPage?: Page
// ) {
//   const route = ref<Page>(startPage)
  
//   function onHashChanged() {
//     route.value = enumKeyFromValue(pageType, location.hash.slice(1))
//   }
  
//   onMounted(() => {
    
//   })
//   onUnmounted(() => {
//     window.removeEventListener('hashchange', onHashChanged)
//   })
  
//   return route
// }
