import type { DailyHistory, CompletedTerm } from "@/models/history";
import type { InputState } from "@/models/input";
import historyStore from "@/stores/history";
import { LocalStorageItem, retrieve, save } from './persistence';
import '@/assets/tungsten/extensions/date.extensions'

interface RawDailyHistory {
  date: string,
  completedTerms: CompletedTerm[]
}

export function retrieveDailyHistory(): DailyHistory | undefined {
  const rawDailyHistory = retrieve<RawDailyHistory>(LocalStorageItem.DailyHistory)
  if (!rawDailyHistory) {
    return undefined
  }
  
  return {
    date: new Date(rawDailyHistory.date),
    completedTerms: rawDailyHistory.completedTerms
  }
}

export function saveDailyHistory() {
  const history = historyStore()
  
  save(LocalStorageItem.DailyHistory, {
    date: history.daily.date,
    completedTerms: history.daily.completedTerms
  } as DailyHistory)
}

export function resetDailyHistoryIfNeeded() {
  const history = historyStore()
  const dateDifference = (new Date()).getDaysFrom(history.daily.date)
  
  if (dateDifference < 1)
    return
  
  history.daily.date = Date.today()
  history.daily.completedTerms = []
  
  saveDailyHistory()
}

export function saveWordInDailyHistory(inputState: InputState) {
  resetDailyHistoryIfNeeded()

  const history = historyStore()
  
  // const indexOfWord = history.daily.completedTerms.findIndex(ct => ct.baseWord === inputState.source.baseWord)
  // if (indexOfWord) {
  //   history.daily.completedTerms.splice(indexOfWord, 1)
  // }
  
  history.daily.completedTerms.push({
    baseWord: inputState.source.baseWord,
    linkedWords: inputState.source.linkedWords,
    hintCount: inputState.hintCount
  })
  
  saveDailyHistory()
}
