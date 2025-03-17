import dailyHistoryStore from "@/stores/history";
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

export function saveDailyWord(word: string) {
  resetDailyHistoryIfNeeded()

  const dailyHistory = dailyHistoryStore()
  if (dailyHistory.words.includes(word)) {
    return
  }
  
  dailyHistory.words.push(word)
  
  saveDailyHistory()
}
