import type { Language } from "./language";

export enum LexiconSource {
  DailyHistory,
  Repository
}

export interface Lexicon {
  language: Language
  terms: string[]
  source: LexiconSource
}
