import { type Term } from './content'
import { type InputMark } from './input'

export interface CompletedTerm extends Term {
  inputMarks: InputMark[]
}

export interface RawDailyHistory {
  completedTerms: CompletedTerm[],
  date: string
}

export interface DailyHistory {
  completedTerms: CompletedTerm[]
  date: Date
}
