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
    latestActivityAt: new Date(rawSession.latestActivityAt ? rawSession.latestActivityAt : 0),
    terms: rawSession.terms
  }
}

export function saveSession() {
  const session = useSessionStore()
  
  save<RawSession>(sessionStorageKey, {
    currentTermIndex: session.currentTermIndex,
    latestActivityAt: session.latestActivityAt.toISOString(),
    terms: session.allTerms,
  })
}

async function resetSession() {
  const session = useSessionStore()
  
  session.allTerms = []
  session.latestActivityAt = new Date()
  
  await session.updateActiveTerms()
  
  saveSession()
}

export async function resetSessionIfNeeded(): Promise<boolean> {
  const session = useSessionStore()
  
  const isStale = (new Date()).getDaysFrom(session.date) >= 1
  if (!isStale) {
    return false
  }
  
  await resetSession()
  
  return true
}

export async function prepareSession() {
  const didReset = await resetSessionIfNeeded()
  if (!didReset) {
    await updateSession()
  }
}

export async function updateSession() {
  const session = useSessionStore()
  
  session.latestActivityAt = new Date()
  
  await session.updateActiveTerms()
  
  saveSession()
}
