import type { Term } from './content'
// import type { Deck } from './game'

export interface RawSession {
  // deck: Deck
  latestActivityAt: string
  terms: Term[]
  
  currentTermIndex?: number
}

export interface Session {
  date: Date
  // deck: Deck
  latestActivityAt: Date
  terms: Term[]
  
  currentTermIndex?: number
}
