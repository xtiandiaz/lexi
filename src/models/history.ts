import { type Term } from './content.models'

export interface RawDailyHistory {
  terms: Term[],
  date: string
}

export interface DailyHistory {
  terms: Term[]
  date: Date
}
