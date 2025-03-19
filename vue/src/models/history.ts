export interface CompletedTerm {
  baseWord: string
  linkedWords: string[]
  hintCount: number
}

export interface DailyHistory {
  date: Date
  completedTerms: CompletedTerm[]
}
