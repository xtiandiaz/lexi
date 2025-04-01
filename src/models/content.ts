import type { Language } from "./language";
import '@/assets/tungsten/extensions/array.extensions'

export enum TermTag {
  Anatomy = 'anat',
  Bird = 'bird',
  Botany = 'bot',
  Chemisty = 'chem',
  Geometry = 'geom',
  Medicine = 'med',
  Physics = 'phys',
  Plant = 'plant',
}

export enum TermMetaTag {
  WikipediaKeyword = 'wk',
}

export interface TermMetaAttribute {
  metaTag: TermMetaTag
  value: string
}

export interface Term {
  hintPrefixLength: number
  
  readonly aliases?: string[]
  readonly word: string
  readonly tags?: TermTag[]
  readonly metaData?: TermMetaAttribute[]
}

export class Content {
  readonly language: Language
  
  _terms?: Term[]
  _rawTerms?: string[]
  
  constructor(language: Language, terms?: Term[], rawTerms?: string[]) {
    this.language = language
    this._terms = terms
    this._rawTerms = rawTerms
  }
  
  get termCount(): number {
    return this._terms?.length ?? this._rawTerms?.length ?? 0
  }
  
  produceRandomTerm(): Term {
    return this.produceTerm(
      Math.floor(Math.random() * (this._terms ? this._terms.length : this._rawTerms!.length))
    )
  }
  
  produceTerm(index: number, hintPrefixRate: number = 0.25): Term {
    if (this._terms) {
      const term = this._terms[index]
      term.hintPrefixLength = hintPrefixRate
      return term
    }
    
    return Content.composeTerm(this._rawTerms![index], hintPrefixRate)
  }
  
  static composeTerm(rawTerm: string, hintPrefixRate: number): Term {
    const parts = rawTerm.split(';')
    const words = parts[0].split(',')
    
    return {
      word: words[0], 
      hintPrefixLength: Math.floor(words[0].length * hintPrefixRate), 
      aliases: words.length > 1 ? words.slice(1) : undefined
    }
  }
  
  static aliasesStringFromTerm(term: Term): string | undefined {
    return term.aliases?.join(', ')
  }
}
