import type { App, Component, ComputedRef, Ref } from 'vue'
import { ref, computed } from "vue"

export interface Route {
  key: string
  view: Component
}

export interface HashRouterOptions {
  rootRouteKey: string
  routes: Route[]
}

export class HashRouter {
  currentRoute: ComputedRef<Route>
  
  _path: Ref<string[]>
  _routes: Record<string, Route>
  
  readonly _rootKey: string
  
  constructor(routes: Route[], rootRouteKey: string) {
    this._routes = Object.fromEntries(routes.map(r => [ r.key, r ]))
    this._rootKey = rootRouteKey
    this._path = ref(this._keysFromHash(location.hash))
    this.currentRoute = computed(() => this._routes[this._path.value[this._path.value.length - 1]])
    
    window.addEventListener('hashchange', () => {
      this._onHashChanged()
    })
  }
  
  navigateToPage<Page extends Record<keyof Page, string>>(page: Page) {
    location.hash = `#${page}`
  }
  
  _onHashChanged() {
    this._path.value = this._keysFromHash(location.hash)
  }
  
  _keysFromHash(hash: string): string[] {
    const hashKeys = hash.slice(1).split('/')
    // console.log('hashKeys:', hashKeys)
    const routeKeys = hashKeys.map(k => k.length === 0 ? this._rootKey : this._routes[k]?.key).filter(k => k)
    // console.log('routeKeys:', routeKeys)
    
    return routeKeys.length > 0 ? routeKeys : [this._rootKey]
  }
}

export default {
  install: (app: App, options: HashRouterOptions) => {
    const hashRouter = new HashRouter(options.routes, options.rootRouteKey)
    
    app.provide('hash-router', hashRouter)
    app.config.globalProperties.$hashRouter = hashRouter
  }
}
