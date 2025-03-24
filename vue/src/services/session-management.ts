import { GameMode } from '@/models/game'
import sessionStore from '@/stores/session'
import { loadRepositoryContent, loadDailyHistoryContent } from '@/services/content-provision'

export function prepareReview() {
  const content = loadDailyHistoryContent()
  if (!content) {
    console.error('Unavailable content for review')
  }
  
  const session = sessionStore()
  session.content = content
  session.gameMode = GameMode.Review  
}

export async function resetSession(): Promise<void> {
  const session = sessionStore()
  
  session.content = await loadRepositoryContent()
  session.gameMode = GameMode.Exploration
}

export async function resetSessionIfNeeded(): Promise<void> {
  const session = sessionStore()
  
  if (session.gameMode === GameMode.Review && session.content?.hasNewTermsAvailable === true) {
    return
  }
  
  return resetSession()
}
