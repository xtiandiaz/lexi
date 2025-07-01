import { type Term } from './content'
import { type InputMark } from './input'
import type { Language } from './localization'

export interface CompletedTerm extends Term {
  inputMarks: InputMark[]
}

export interface RawDailyHistory {
  completedTerms: CompletedTerm[],
  date: string,
  language: Language
}

export interface DailyHistory {
  completedTerms: CompletedTerm[]
  date: Date
  language: Language
}
