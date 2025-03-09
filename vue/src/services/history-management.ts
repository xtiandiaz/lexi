import '@/assets/tungsten/extensions/date.extensions'
import { dailyHistoryStore } from "@/stores/history";
import { saveDailyHistory } from './persistence';

export function resetDailyHistoryIfNeeded() {
  const dailyHistory = dailyHistoryStore()
  const dateDifference = (new Date()).getDaysFrom(dailyHistory.date)
  
  if (dateDifference < 1)
    return
  
  dailyHistory.date = Date.today()
  dailyHistory.words = []
  
  saveDailyHistory()
}

export function addDailyWord(word: string) {
  resetDailyHistoryIfNeeded()

  const dailyHistory = dailyHistoryStore()
  dailyHistory.words.push(word)
  
  saveDailyHistory()
}
