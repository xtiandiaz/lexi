import { enumKeyFromValue } from "@/assets/tungsten/enum";
import type { Language } from "./language";
import '@/assets/tungsten/extensions/array.extensions'

export enum TermTag {
  Anatomy = 'anat',
  Architecture = 'arch',
  Astronomy = 'astro',
  Biochemistry = 'biochem',
  Biology = 'bio',
  Bird = 'bird',
  Botany = 'bot',
  Chemisty = 'chem',
  Economy = 'econ',
  Fish = 'fish',
  Geography = 'geogr',
  Geology = 'geol',
  Geometry = 'geom',
  Medicine = 'med',
  Meteorology = 'meteor',
  Philosophy = 'philos',
  Physics = 'phys',
  Physiology = 'physiol',
  Psychiatry = 'psych',
  Psychology = 'psychol',
  Plant = 'plant',
  Zoology = 'zool'
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
  
  readonly word: string
  
  readonly aliases?: string[]
  readonly extras?: TermExtras
}

export interface TermExtras {
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
    
    const extras = parts.length > 1 ? Content._extractExtrasFromRaw(parts[1]) : undefined
    
    return {
      word: Content._cleanWord(words[0]), 
      hintPrefixLength: Math.floor(words[0].length * hintPrefixRate), 
      aliases: words.length > 1 ? words.slice(1).map(Content._cleanWord) : undefined, 
      extras
    }
  }
  
  static aliasesStringFromTerm(term: Term): string | undefined {
    return term.aliases?.join(', ')
  }
  
  private static _extractExtrasFromRaw(rawExtras: string): TermExtras | undefined {
    const extraStrings = rawExtras.split(' ')
    const tags: TermTag[] = []
    const metaAttributes: TermMetaAttribute[] = []
    
    for (const extraString of extraStrings) {
      const extraHead = extraString[0]
      
      switch (extraHead) {
        case '#':
          const tag = enumKeyFromValue(TermTag, extraString.slice(1))
          if (tag) {
            tags.push(tag)
          }
          break
        case '[':
          const parts = extraString.slice(1, -1).split(':')
          if (parts.length < 2) {
            continue
          }
          const attributeKey = enumKeyFromValue(TermMetaAttributeKey, parts[0])
          if (attributeKey) {
            metaAttributes.push({ key: attributeKey, value: parts[1] })
          }
          break
      }
    }
    
    if (tags.length > 0 || metaAttributes.length > 0) {
      return {
        tags: tags.length > 0 ? tags : undefined,
        metaAttributes: metaAttributes.length > 0 ? metaAttributes : undefined
      }
    }
    
    return undefined
  }
  
  private static _cleanWord(word: string): string {
    const matches = /^(\s)?[\S\s]+\S+(\s)?$/m.exec(word)
    // console.log(`Word '${word}' cleaning; matches:`, matches)
    
    if (matches) {
      if (matches[1]) {
        word = word.slice(matches[1].length)
      }
      if (matches[2]) {
        word = word.slice(-matches[2].length)
      }
    }
    
    return word
  }
}
