import type { RawDailyHistory, DailyHistory, CompletedTerm } from "@/models/history";
import type { InputState } from "@/models/input";
import { LocalStorageItemKey } from '@/models/persistence'
import historyStore from "@/stores/history";
import { retrieve, save } from '@/assets/tungsten/local-storage'
import '@/assets/tungsten/extensions/date.extensions'

export function retrieveSavedDailyHistory(): DailyHistory | undefined {
  const rawDailyHistory = retrieve<RawDailyHistory>(LocalStorageItemKey.DailyHistory)
  if (!rawDailyHistory) {
    return undefined
  }
  
  return {
    completedTerms: rawDailyHistory.completedTerms,
    date: new Date(rawDailyHistory.date)
  }
}

export function saveDailyHistory() {
  const history = historyStore()
  
  save(LocalStorageItemKey.DailyHistory, history.dailyHistory)
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
  history.dailyHistory.completedTerms = []
  
  saveDailyHistory()
}

export function saveWordInDailyHistory(inputState: InputState) {
  resetDailyHistoryIfNeeded()

  const history = historyStore()
  
  const newCompletedTerm: CompletedTerm = {
    ...inputState.term,
    inputMarks: inputState.marks
  }
  
  const dailyHistory = history.dailyHistory
  if (dailyHistory) {
    const existingIndex = dailyHistory.completedTerms.findIndex(ct => ct.word === newCompletedTerm.word)
    if (existingIndex >= 0) {
      dailyHistory.completedTerms[existingIndex].inputMarks = inputState.marks
    } else {
      dailyHistory.completedTerms.push(newCompletedTerm)
    }
  } else {
    history.dailyHistory = {
      completedTerms: [newCompletedTerm],
      date: Date.today()
    }
  }
  
  saveDailyHistory()
}
