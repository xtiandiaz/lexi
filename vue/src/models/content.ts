import type { CompletedTerm } from "./history";
import type { Language } from "./language";

export enum ContentSource {
  DailyHistory,
  Repository
}

export interface Term {
  readonly baseWord: string
  readonly hintPrefixLength: number
  readonly linkedWords: string[]
}

export class Content {
  readonly language: Language
  readonly rawTerms: string[]
  readonly source: ContentSource
  
  _currentTermIndex = 0
  
  constructor(language: Language, rawTerms: string[], source: ContentSource) {
    this.language = language
    this.source = source
    this.rawTerms = rawTerms
  }
  
  get hasNewTermsAvailable(): boolean {
    switch (this.source) {
      case ContentSource.DailyHistory:
        return this._currentTermIndex < this.rawTerms.length - 1
      case ContentSource.Repository:
        return true
    }
  }
  
  get nextTerm(): Term | undefined {
    switch (this.source) {
      case ContentSource.DailyHistory:
        if (this._currentTermIndex < this.rawTerms.length) {
          const term = Content.termFromRaw(
            this.rawTerms[this._currentTermIndex], 
            Content.hintPrefixRate(this.source)
          )
          this._currentTermIndex++
          return term
        }
        break
      case ContentSource.Repository:
        return Content.termFromRaw(
          this.rawTerms[Math.floor(Math.random() * this.rawTerms.length)],
          Content.hintPrefixRate(this.source)
        )
    }
    
    return undefined
  }
  
  static fromCompletedTerms(completedTerms: CompletedTerm[], language: Language) {
    const rawTerms = completedTerms.map(ct => [ct.baseWord].concat(ct.linkedWords).join(','))
    
    return new Content(language, rawTerms.shuffle(), ContentSource.DailyHistory)
  }
  
  static termFromRaw(rawTerm: string, hintPrefixRate: number): Term {
    const parts = rawTerm.split(',')
    
    return { 
      baseWord: parts[0], 
      hintPrefixLength: Math.floor(parts[0].length * hintPrefixRate), 
      linkedWords: parts.slice(1) 
    }
  }
  
  static hintPrefixRate(source: ContentSource): number {
    switch (source) {
      case ContentSource.DailyHistory:
        return 0
      case ContentSource.Repository:
        return 0.25
    }
  }
}
