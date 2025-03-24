import { Content, ContentSource } from '@/models/content'
import settingsStore from '@/stores/settings'
import historyStore from '@/stores/history'
import sessionStore from '@/stores/session'
import '@/assets/tungsten/extensions/array.extensions'

export async function loadRepositoryContent(): Promise<Content | undefined> {
  const settings = settingsStore()
  const session = sessionStore()
  const currentContent = session.content
  
  if (
    currentContent?.source === ContentSource.Repository &&
    currentContent?.language === settings.currentLanguage
  ) {
    return session.content
  }
  
  const urlString = `https://raw.githubusercontent.com/xtiandiaz/lexicon/refs/heads/main/terms/${settings.currentLanguage}.txt`
  
  try {
    const response = await fetch(`${urlString}?salt=${Math.random()}`)
    // console.log(response)
    const terms = (await response.text()).split('\n')
    // console.log(terms)
    
    return new Content(settings.currentLanguage, terms, ContentSource.Repository)    
  } catch (error) {
    console.error(`Language: ${settings.currentLanguage}`, error)
    return undefined
  }
}

export function loadDailyHistoryContent(): Content | undefined {
  const settings = settingsStore()
  const history = historyStore()
  
  const dailyHistory = history.currentDailyHistory
  if (!dailyHistory || dailyHistory.completedTerms.length === 0) {
    console.warn(`Unavailable daily-history for language '${settings.currentLanguage}'`)
    return undefined
  }
  
  return Content.fromCompletedTerms(dailyHistory.completedTerms, dailyHistory.language)
}
