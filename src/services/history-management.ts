import type { RawDailyHistory, DailyHistory } from "@/models/history"
import useHistoryStore from "@/stores/history"
import useSessionStore from '@/stores/session'
import { retrieve, save } from '@/assets/tungsten/local-storage'
import '@/assets/tungsten/extensions/date.extensions'

const dailyHistoryKey = 'daily-history'

export function retrieveSavedDailyHistory(): DailyHistory | undefined {
  const rawDailyHistory = retrieve<RawDailyHistory>(dailyHistoryKey)
  if (!rawDailyHistory) {
    return undefined
  }
  
  return {
    currentIndex: rawDailyHistory.currentIndex,
    date: new Date(rawDailyHistory.date),
    terms: rawDailyHistory.terms,
  }
}

export function updateAndSaveDailyHistory() {
  const history = useHistoryStore()
  const session = useSessionStore()
  
  history.dailyHistory.terms = session.terms
  history.dailyHistory.currentIndex = session.currentTermIndex
  
  save(dailyHistoryKey, history.dailyHistory)
}

export function resetDailyHistoryIfNeeded() {
  const history = useHistoryStore()
  if (!history.dailyHistory) {
    return
  }
  
  const dateDifference = (new Date()).getDaysFrom(history.dailyHistory.date)
  if (dateDifference < 1) {
    return
  }
  
  history.dailyHistory.date = Date.today()
  history.dailyHistory.terms = []
  history.dailyHistory.currentIndex = undefined
  
  updateAndSaveDailyHistory()
}
