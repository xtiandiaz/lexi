import { type Term } from './content.models'

export interface RawDailyHistory {
  date: string
  terms: Term[]
  
  currentIndex?: number
}

export interface DailyHistory {
  date: Date
  terms: Term[]
  
  currentIndex?: number
}
