import { dailyHistoryStore } from "@/stores/history";

export enum LocalStorageKey {
  Day = 'day',
  DailyWords = 'daily_words'
}

function save(key: string, value: string) {
  localStorage.setItem(key, value)
}

function _retrieve(key: string): string | undefined {
  const item = localStorage.getItem(key)
  
  return item !== null ? item : undefined
}

export function retrieve(key: LocalStorageKey): string | undefined {
  return _retrieve(key)
}

export function saveDailyHistory() {
  const dailyHistory = dailyHistoryStore()
  
  save(LocalStorageKey.Day, dailyHistory.date.toString())
  save(LocalStorageKey.DailyWords, dailyHistory.words.join(';'))
}
