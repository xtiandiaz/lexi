import { enumKeyFromValue } from "@/assets/tungsten/misc";
import type { Language } from "./language";
import '@/assets/tungsten/extensions/array.extensions'

export enum TermTag {
  Anatomy = 'anat',
  Bird = 'bird',
  Biochemistry = 'biochem',
  Biology = 'bio',
  Botany = 'bot',
  Chemisty = 'chem',
  Geology = 'geo',
  Geometry = 'geom',
  Medicine = 'med',
  Meteorology = 'meteor',
  Philosophy = 'philos',
  Physics = 'phys',
  Physiology = 'physiol',
  Psychiatry = 'psych',
  Psychology = 'psychol',
  Plant = 'plant',
}

export enum TermMetaAttributeKey {
  WikipediaKeyword = 'wk',
}

export interface TermMetaAttribute {
  key: TermMetaAttributeKey
  value: string
}

export interface Term {
  hintPrefixLength: number
  
  readonly aliases?: string[]
  readonly word: string
  readonly tags?: TermTag[]
  readonly metaAttributes?: TermMetaAttribute[]
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
    
    const extras = parts.length > 1 ? parts[1].split(' ') : undefined
    const tags: TermTag[] = []
    
    extras?.forEach(extra => {
      if (extra[0] === '#') {
        const tag = enumKeyFromValue(TermTag, extra.slice(1))
        if (tag) {
          tags.push(tag)
        }
      }
    })
    
    return {
      word: words[0], 
      hintPrefixLength: Math.floor(words[0].length * hintPrefixRate), 
      aliases: words.length > 1 ? words.slice(1) : undefined, 
      tags: tags && tags.length > 0 ? tags : undefined
    }
  }
  
  static aliasesStringFromTerm(term: Term): string | undefined {
    return term.aliases?.join(', ')
  }
}
