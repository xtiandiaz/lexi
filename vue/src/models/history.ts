import { type InputMark } from './input'
import type { Language } from './language'

export interface CompletedTerm {
  baseWord: string
  inputMarks: InputMark[]
  linkedWords: string[]
}

export interface DailyHistory {
  completedTerms: CompletedTerm[]
  date: Date
  language: Language
}
