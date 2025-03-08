import '@/assets/tungsten/extensions/date.extensions'
import { dailyHistoryStore } from "@/stores/history";

export function resetDailyHistoryIfNeeded() {
  const dailyHistory = dailyHistoryStore()
  const dateDifference = (new Date()).getDaysFrom(dailyHistory.date)
  
  if (dateDifference < 1)
    return
  
  dailyHistory.words = []
  dailyHistory.date = Date.today()
}

export function addDailyWord(word: string) {
  resetDailyHistoryIfNeeded()

  const dailyHistory = dailyHistoryStore()
  dailyHistory.words.push(word)
}
