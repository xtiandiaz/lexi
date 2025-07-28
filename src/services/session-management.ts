import { Test } from '@/models/game'
import { InputMarkKind, type InputState } from '@/models/input'
import type { CompletedTerm } from '@/models/history'
import type { Session } from '@/models/session'
import { LocalStorageItemKey } from '@/models/persistence'
import useGameStore from '@/stores/game'
import historyStore from '@/stores/history'
import { loadRepositoryContent } from '@/services/content-provision'
import { retrieve, save } from '@/assets/tungsten/local-storage'

export function storeAndSaveSessionIfNeeded(inputState: InputState) {
  const session = useGameStore()
  
  if (session.test) {
    console.warn("Session NOT saved during test", session.test)
    return
  }
  
  session.inputState = inputState
  
  save<Session>(LocalStorageItemKey.Session, {
    inputState
  })
}

export function retrievedSavedSession(): Session | undefined {
  return retrieve<Session>(LocalStorageItemKey.Session)
}

export async function resetSession(): Promise<void> {
  const session = useGameStore()
  
  session.test = undefined
  session.content = await loadRepositoryContent()
}

export async function resetSessionIfNeeded(): Promise<void> {
  const session = useGameStore()
  
  if (session.test) {
    return
  }
  
  return resetSession()
}

export function prepareTest() {
  const settings = useGameStore().settings
  const dailyHistory = historyStore().dailyHistory
  const completedTerms: CompletedTerm[] | undefined = dailyHistory?.completedTerms
  if (!dailyHistory || !completedTerms || completedTerms.length < settings.minTermCountForTest) {
    console.error('Scanty content for a test!', completedTerms)
    return
  }
  
  completedTerms.forEach(ct => {
    ct.hintPrefixLength = 0
    
    const testMark = ct.inputMarks.find(im => im.kind === InputMarkKind.Test)
    if (testMark) {
      testMark.value = 0
    }
  })
  
  const session = useGameStore()
  
  session.test = new Test(completedTerms)
}
