import type { CompletedTerm } from "./history";
import type { Language } from "./language";

export interface Term {
  readonly baseWord: string
  readonly hintPrefixLength: number
  readonly linkedWords: string[]
}

export class Content {
  readonly language: Language
  
  _rawTerms: string[]
  
  constructor(language: Language, rawTerms: string[]) {
    this.language = language
    this._rawTerms = rawTerms
  }
  
  get termCount(): number {
    return this._rawTerms.length
  }
  
  newTerm(): Term {
    return this._randomTerm()
  }
  
  term(index: number, hintPrefixRate: number = 0.25): Term {
    return Content.termFromRaw(this._rawTerms[index], hintPrefixRate)
  }
  
  _randomTerm(): Term {
    return this.term(Math.floor(Math.random() * this._rawTerms.length))
  }
  
  static fromCompletedTerms(completedTerms: CompletedTerm[], language: Language) {
    const rawTerms = completedTerms.map(ct => [ct.baseWord].concat(ct.linkedWords).join(','))
    
    return new Content(language, rawTerms.shuffle())
  }
  
  static termFromRaw(rawTerm: string, hintPrefixRate: number): Term {
    const parts = rawTerm.split(',')
    
    return { 
      baseWord: parts[0], 
      hintPrefixLength: Math.floor(parts[0].length * hintPrefixRate), 
      linkedWords: parts.slice(1) 
    }
  }
}
