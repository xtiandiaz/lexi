import { Test } from '@/models/game'
import { InputMarkKind, type InputState } from '@/models/input'
import { type Session } from '@/models/session'
import { LocalStorageItemKey } from '@/models/persistence'
import sessionStore from '@/stores/session'
import historyStore from '@/stores/history'
import settingsStore from '@/stores/settings'
import { loadRepositoryContent } from '@/services/content-provision'
import { retrieve, save } from '@/assets/tungsten/local-storage'

export function saveSessionIfNeeded(currentInputState: InputState) {
  const session = sessionStore()
  
  if (session.test) {
    console.warn("Session NOT saved during test", session.test)
    return
  }
  
  if (currentInputState) {
    session.setInputState(currentInputState)
  }
  
  save<Session>(LocalStorageItemKey.Session, {
    inputStates: session.inputStates
  })
}

export function retrievedSavedSession(): Session | undefined {
  return retrieve<Session>(LocalStorageItemKey.Session)
}

export async function resetSession(): Promise<void> {
  const session = sessionStore()
  
  session.test = undefined
  session.content = await loadRepositoryContent()
}

export async function resetSessionIfNeeded(): Promise<void> {
  const session = sessionStore()
  
  if (session.test) {
    return
  }
  
  return resetSession()
}

export function prepareTest() {
  const settings = settingsStore()
  const dailyHistory = historyStore().currentDailyHistory
  const completedTerms = dailyHistory?.completedTerms
  if (!dailyHistory || !completedTerms || completedTerms.length < settings.minTermCountForTest) {
    console.error('Scanty content for a test!', completedTerms)
    return
  }
  
  completedTerms.forEach((ct) => {
    const testMark = ct.inputMarks.find(im => im.kind === InputMarkKind.Test)
    if (testMark) {
      testMark.value = 0
    }
  })
  
  const session = sessionStore()
  
  session.test = new Test(completedTerms)
}
