import type { RawSession, Session } from '@/models/session'
import useSessionStore from '@/stores/session'
import { retrieve, save } from '@/assets/tungsten/local-storage'
import '@/assets/tungsten/extensions/date.extensions'

const sessionStorageKey = 'session'

export function retrievedSavedSession(): Session | undefined {
  const rawSession = retrieve<RawSession>(sessionStorageKey)
  if (!rawSession) {
    return undefined
  }
  
  return {
    currentTermIndex: rawSession.currentTermIndex ?? 0,
    date: new Date(rawSession.latestActivityAt.split('T')[0]),
    // deck: rawSession.deck,
    latestActivityAt: new Date(rawSession.latestActivityAt),
    terms: rawSession.terms
  }
}

export function saveSession() {
  const session = useSessionStore()
  
  save<RawSession>(sessionStorageKey, {
    currentTermIndex: session.currentTermIndex,
    latestActivityAt: (new Date()).toDateString(),
    terms: session.terms,
  })
}

export function resetSession() {
  const session = useSessionStore()
  
  session.terms = []
  session.currentTermIndex = 0
  
  saveSession()
}

export function resetSessionIfNeeded(): boolean {
  const session = useSessionStore()
  
  const isStale = (new Date()).getDaysFrom(session.date) >= 1
  if (!isStale) {
    return false
  }
  
  resetSession()
  
  return true
}
