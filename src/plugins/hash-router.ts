import type { App, Component, ComputedRef, Ref } from 'vue'
import { ref, computed } from "vue"
import '@/assets/tungsten/extensions/array.extensions'

export enum HashRoutePresentationStyle {
  Modal
}

export interface HashRoute {
  key: string
  view: Component
  presentationStyle?: HashRoutePresentationStyle
}

export interface HashRouterOptions {
  rootRouteKey: string
  routes: HashRoute[]
}

export class HashRouter {
  currentRoute: ComputedRef<HashRoute>
  
  _trail: Ref<string[]>
  _routes: Record<string, HashRoute>
  
  readonly _rootRouteKey: string
  
  constructor(routes: HashRoute[], rootRouteKey: string) {
    this._routes = Object.fromEntries(routes.map(r => [r.key, r]))
    this._rootRouteKey = rootRouteKey
    this._trail = ref(this._trailFromHash(location.hash))
    
    this.currentRoute = computed(() => this._routes[this._trail.value.last()!])
    
    window.addEventListener('hashchange', () => {
      this._onHashChanged()
    })
  }
  
  isValidRouteKey(key: string): boolean {
    return this._routes[key] !== undefined
  }
  
  pushRoute(key: string) {
    if (this.isValidRouteKey(key)) {
      this._trail.value.push(key)
    }
    this._applyTrail()
  }
  
  popRoute(): string | undefined {
    const poppedRouteKey = this._trail.value.pop()
    if (this._trail.value.length === 0) {
      this._trail.value = [this._rootRouteKey]
    }
    
    this._applyTrail()
    
    return poppedRouteKey
  }
  
  setPath(path: string) {
    this._trail.value = this._trailFromPath(path)
    this._applyTrail()
  }
  
  _applyTrail() {
    location.hash = `#${this._trail.value.join('/')}`
  }
  
  _trailFromHash(hash: string): string[] {
    return this._trailFromPath(hash.slice(1))
  }
  
  _trailFromPath(path: string): string[] {    
    const rawKeys = path.split('/')
    // console.log('rawKeys:', rawKeys)
    const routeKeys = rawKeys.filter(rk => this.isValidRouteKey(rk) ? rk : undefined)
    // console.log('routeKeys:', routeKeys)
    
    return routeKeys.length > 0 ? routeKeys : [this._rootRouteKey]
  }
  
  _onHashChanged() {
    this._trail.value = this._trailFromHash(location.hash)
  }
}

export default {
  install: (app: App, options: HashRouterOptions) => {
    const hashRouter = new HashRouter(options.routes, options.rootRouteKey)
    
    app.provide('hash-router', hashRouter)
    app.config.globalProperties.$hashRouter = hashRouter
  }
}
