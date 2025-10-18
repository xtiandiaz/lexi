import type { Language } from "./localization"
import type { InputState } from "./input"

export interface RawLanguageContent {
  readonly language: Language
  readonly rawTerms: string[]
}

export interface LanguageTermCollection {
  language: Language
  terms: Term[]
}

export enum TermMarkKind {
  Clue = 'clue'
}

export interface TermMark {
  readonly kind: TermMarkKind
  value: number
}

export interface Term {
  // readonly id: number
  readonly word: string
  
  readonly aliases?: string[]
  readonly language?: Language
  inputState?: InputState
  marks?: TermMark[]
}
