import type { CompletedTerm } from "./history";
import type { Language } from "./language";
import '@/assets/tungsten/extensions/array.extensions'

export interface Term {
  readonly baseWord: string
  readonly hintPrefixLength: number
  readonly linkedWords?: string[][]
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
  
  produceNewTerm(): Term {
    return this.produceTerm(Math.floor(Math.random() * this._rawTerms.length))
  }
  
  produceTerm(index: number, hintPrefixRate: number = 0.25): Term {
    return Content.makeTermFromRaw(this._rawTerms[index], hintPrefixRate)
  }
  
  static fromCompletedTerms(completedTerms: CompletedTerm[], language: Language) {
    const rawTerms = completedTerms.map(ct => Content.makeRawFromCompletedTerm(ct))
    
    return new Content(language, rawTerms.shuffle())
  }
  
  static makeTermFromRaw(rawTerm: string, hintPrefixRate: number): Term {
    const isComposite = rawTerm.includes(';')
    const parts = rawTerm.split(isComposite ? ';' : ',')
    
    return {
      baseWord: parts[0], 
      hintPrefixLength: Math.floor(parts[0].length * hintPrefixRate), 
      linkedWords: (() => {
        if (parts.length <= 1) {
          return undefined
        }
        return isComposite ? parts.slice(1).map(ls => ls.split(',')) : [parts.slice(1)]
      })()
    }
  }
  
  static makeRawFromCompletedTerm(completedTerm: CompletedTerm): string {
    if (!completedTerm.linkedWords) {
      return completedTerm.baseWord
    }
    
    const isComposite = completedTerm.linkedWords.length > 1
    
    return [completedTerm.baseWord].concat(
      completedTerm.linkedWords.map(lw => lw.join(','))
    ).join(isComposite ? ';' : ',')
  }
  
  static makeLinkedWordsStringFromTerm(term: Term): string | undefined {
    return term.linkedWords?.map(ls => ls.join(', ')).join(' | ')
  }
}
