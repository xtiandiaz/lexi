import { type Term } from './content'
import { type InputMark } from './input'
import type { Language } from './language'

export interface CompletedTerm extends Term {
  inputMarks: InputMark[]
}

export interface DailyHistory {
  completedTerms: CompletedTerm[]
  date: Date
  language: Language
}
