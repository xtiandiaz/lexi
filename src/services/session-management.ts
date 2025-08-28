import type { Session } from '@/models/session'
import useSessionStore from '@/stores/session'
import { retrieve, save } from '@/assets/tungsten/local-storage'
import '@/assets/tungsten/extensions/date.extensions'

const sessionKey = 'session'

export function retrieveSession(): Session | undefined {
  return retrieve<Session>(sessionKey)
}

export function saveSession() {
  const session = useSessionStore()
  
  save<Session>(sessionKey, {
    currentTermIndex: session.currentTermIndex,
    latestActivityAt: session.latestActivityAt.toDateString(),
    terms: session.terms,
  })
}

export function resetSession() {
  const session = useSessionStore()
  
  session.latestActivityAt = Date.today()
  session.currentTermIndex = 0
  session.terms = []
  
  saveSession()
}

export function resetSessionIfNeeded() {
  const session = useSessionStore()
  
  const isStale = session.latestActivityAt.getDaysFrom(new Date()) >= 1
  if (isStale) {
    return
  }
  
  resetSession()
}
