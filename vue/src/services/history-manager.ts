import '@/assets/tungsten/extensions/date.extensions'
import { dailyHistoryStore } from "@/stores/history";

export function addDailyWord(word: string) {
  const dailyHistory = dailyHistoryStore()
  const dateDifference = (new Date()).getDaysFrom(dailyHistory.date)
  
  console.log(dateDifference, word)
  
  if (dateDifference > 1) {
    dailyHistory.words.length = 0
    dailyHistory.date = Date.today()
  }
  
  dailyHistory.words.push(word)
}
