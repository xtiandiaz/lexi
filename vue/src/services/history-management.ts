import type { DailyHistory, CompletedTerm } from "@/models/history";
import type { InputState } from "@/models/input";
import { Language } from "@/models/language";
import historyStore from "@/stores/history";
import { LocalStorageItem, retrieve, save } from './persistence';
import '@/assets/tungsten/extensions/date.extensions'

interface RawDailyHistory {
  completedTerms: CompletedTerm[],
  date: string,
  language: Language
}

export function retrieveSavedDailyHistories(): DailyHistory[] | undefined {
  const rawDailyHistories = retrieve<RawDailyHistory[]>(LocalStorageItem.DailyHistories)
  if (!rawDailyHistories) {
    return undefined
  }
  
  return rawDailyHistories.map(rdh => {
    return {
      completedTerms: rdh.completedTerms,
      date: new Date(rdh.date),
      language: rdh.language
    }
  })
}

export function saveDailyHistory() {
  const history = historyStore()
  
  save(
    LocalStorageItem.DailyHistories, 
    history.dailyHistories
  )
}

export function resetDailyHistoryIfNeeded() {
  const history = historyStore()
  if (!history.currentDailyHistory) {
    return
  }
  
  const dateDifference = (new Date()).getDaysFrom(history.currentDailyHistory.date)
  if (dateDifference < 1) {
    return
  }
  
  history.currentDailyHistory.date = Date.today()
  history.currentDailyHistory.completedTerms = []
  
  saveDailyHistory()
}

export function saveWordInDailyHistory(inputState: InputState) {
  resetDailyHistoryIfNeeded()

  const history = historyStore()
  
  const newCompletedTerm: CompletedTerm = {
    ...inputState.source.term,
    inputMarks: inputState.marks
  }
  
  const dailyHistory = history.dailyHistory(inputState.source.language)
  if (dailyHistory) {
    const existingIndex = dailyHistory.completedTerms.findIndex(ct => ct.baseWord === newCompletedTerm.baseWord)
    if (existingIndex >= 0) {
       dailyHistory.completedTerms[existingIndex].inputMarks = inputState.marks
    } else {
      dailyHistory.completedTerms.push(newCompletedTerm)
    }
  } else {
    history.dailyHistories.push({
      completedTerms: [newCompletedTerm],
      date: Date.today(),
      language: inputState.source.language
    })
  }
  
  saveDailyHistory()
}
