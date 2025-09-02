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
  
  const latestActivityAt = rawSession.latestActivityAt ?? (new Date(0)).toISOString()
  
  return {
    currentTermIndex: rawSession.currentTermIndex ?? 0,
    date: new Date(latestActivityAt.split('T')[0]),
    latestActivityAt: new Date(latestActivityAt),
    terms: rawSession.terms
  }
}

export function saveSession() {
  const session = useSessionStore()
  
  save<RawSession>(sessionStorageKey, {
    currentTermIndex: session.currentTermIndex,
    latestActivityAt: (new Date()).toISOString(),
    terms: session.terms,
  })
}

export async function resetSession() {
  const session = useSessionStore()
  
  await session.resetTerms()
  
  session.currentTermIndex = 0
  
  saveSession()
}

export async function resetSessionIfNeeded(): Promise<boolean> {
  const session = useSessionStore()
  
  const isStale = (new Date()).getDaysFrom(session.date) >= 1
  if (isStale || !session.terms) {
    await resetSession()
    
    return true
  }
  
  return false
}
