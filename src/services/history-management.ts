import type { RawDailyHistory, DailyHistory } from "@/models/history";
import historyStore from "@/stores/history";
import { retrieve, save } from '@/assets/tungsten/local-storage'
import '@/assets/tungsten/extensions/date.extensions'

const dailyHistoryKey = 'daily-history'

export function retrieveSavedDailyHistory(): DailyHistory | undefined {
  const rawDailyHistory = retrieve<RawDailyHistory>(dailyHistoryKey)
  if (!rawDailyHistory) {
    return undefined
  }
  
  return {
    terms: rawDailyHistory.terms,
    date: new Date(rawDailyHistory.date)
  }
}

export function saveDailyHistory() {
  const history = historyStore()
  
  save(dailyHistoryKey, history.dailyHistory)
}

export function resetDailyHistoryIfNeeded() {
  const history = historyStore()
  if (!history.dailyHistory) {
    return
  }
  
  const dateDifference = (new Date()).getDaysFrom(history.dailyHistory.date)
  if (dateDifference < 1) {
    return
  }
  
  history.dailyHistory.date = Date.today()
  history.dailyHistory.terms = []
  
  saveDailyHistory()
}
