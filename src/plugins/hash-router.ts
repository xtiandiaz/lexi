import { ref, type App } from "vue"
import { enumKeyFromValue } from "@/assets/tungsten/misc"

export class HashRouter {
  _currentRoute: string
  
  constructor() {
    this._currentRoute = location.hash
    
    window.addEventListener('hashchange', this._onHashChanged)
  }
  
  get currentRoute(): string {
    return this._currentRoute
  }
  
  navigateToPage<Page extends Record<keyof Page, string>>(page: Page) {
    location.hash = `#${page}`
  }
  
  currentPage<Page extends Record<keyof Page, string>>(pageType: Page): Page[keyof Page] | undefined {
    return enumKeyFromValue(pageType, this._currentRoute.slice(1))
  }
  
  _onHashChanged() {
    this._currentRoute = location.hash
  }
}

export default {
  install: (app: App, options) => {
    const hashRouter = ref<HashRouter>()
    
    // app.config.globalProperties.$hashRouter = hashRouter
    app.provide('hash-router', hashRouter)
  }
}
