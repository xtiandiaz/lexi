import type { Term } from './content.models'

export interface Session {
  currentTermIndex: number
  latestActivityAt: string
  terms: Term[]
}
