import { LexiconSource } from '@/models/content'
import settingsStore from '@/stores/settings'
import contentStore from '@/stores/content'
import historyStore from '@/stores/history'
import '@/assets/tungsten/extensions/array.extensions'

function loadDailyHistoryLexicon() {
  const settings = settingsStore()
  const history = historyStore()
  
  const dailyHistoryLexicon = history.currentDailyHistory
  if (!dailyHistoryLexicon) {
    console.warn(`Undefined daily-history for language '${settings.currentLanguage}'`)
    return
  }
  if (dailyHistoryLexicon.completedTerms.length === 0) {
    console.warn(`Unavailable terms from daily-history of language '${settings.currentLanguage}'`)
    return
  }
  
  const content = contentStore()
  content.lexicon = {
    language: dailyHistoryLexicon.language,
    terms: dailyHistoryLexicon.completedTerms.flatMap(ct => [ct.baseWord].concat(ct.linkedWords)).shuffle(),
    source: LexiconSource.DailyHistory
  }
}

export async function loadLexicon(source: LexiconSource) {
  if (source === LexiconSource.DailyHistory) {
    loadDailyHistoryLexicon()
    return
  }
  
  const settings = settingsStore()
  const content = contentStore()
  
  if (content.lexicon?.language === settings.currentLanguage) {
    return
  }
  
  const urlString = `https://raw.githubusercontent.com/xtiandiaz/lexicon/refs/heads/main/terms/${settings.currentLanguage}.txt`
  
  try {
    const response = await fetch(`${urlString}?salt=${Math.random()}`)
    // console.log(response)
    const terms = (await response.text()).split('\n')
    // console.log(terms)
    
    content.lexicon = {
      language: settings.currentLanguage,
      terms,
      source: LexiconSource.Repository
    }
  } catch (error) {
    console.error(`Language: ${settings.currentLanguage}`, error)
  }
}
