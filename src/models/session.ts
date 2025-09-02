import type { Term } from './content'

export interface RawSession {
  latestActivityAt: string
  
  currentTermIndex?: number
  terms?: Term[]
}

export interface Session {
  date: Date
  latestActivityAt: Date
  
  currentTermIndex?: number
  terms?: Term[]
}
