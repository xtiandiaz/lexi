import { Test } from '@/models/game'
import { InputMarkKind } from '@/models/input'
import { Content } from '@/models/content'
import sessionStore from '@/stores/session'
import historyStore from '@/stores/history'
import settingsStore from '@/stores/settings'
import { loadRepositoryContent } from '@/services/content-provision'

export function prepareTest() {
  const settings = settingsStore()
  const dailyHistory = historyStore().currentDailyHistory
  const terms = dailyHistory?.completedTerms
  if (!dailyHistory || !terms || terms.length < settings.minTermCountForTest) {
    console.error('Scanty content for a test!', terms)
    return
  }
  
  terms.forEach((ct) => {
    const testMark = ct.inputMarks.find(im => im.kind === InputMarkKind.Test)
    if (testMark) {
      testMark.value = 0
    }
  })
  
  const session = sessionStore()
  session.test = new Test(Content.fromCompletedTerms(terms, dailyHistory.language))
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
