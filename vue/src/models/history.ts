import { type InputMark } from '@/models/input'

export interface CompletedTerm {
  baseWord: string
  linkedWords: string[]
  inputMarks: InputMark[]
}

export interface DailyHistory {
  date: Date
  completedTerms: CompletedTerm[]
}
