import type { Language } from "./localization"
import { enumKeyFromValue } from "@/assets/tungsten/enum"
import '@/assets/tungsten/extensions/array.extensions'
import '@/assets/tungsten/extensions/string.extensions'

export enum TermTag {
  Anatomy = 'anat',
  Architecture = 'arch',
  Astronomy = 'astro',
  Biochemistry = 'biochem',
  Biology = 'bio',
  Bird = 'bird',
  Botany = 'bot',
  Chemisty = 'chem',
  Ecology ='eco',
  Economy = 'econ',
  Fish = 'fish',
  Food = 'food', 
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
  
  _nextIndex?: number
  _rawTerms?: string[]
  _terms?: Term[]
  
  get termCount(): number {
    return this._terms?.length ?? this._rawTerms?.length ?? 0
  }
  
  static instantiateForTest(language: Language, terms: Term[]): Content {
    return new Content(language, terms.shuffled())
  }
  
  static instantiateForExploration(language: Language, rawTerms: string[]): Content {
    return new Content(language, undefined, rawTerms.shuffled())
  }
  
  static composeTerm(rawTerm: string, hintPrefixRate: number): Term {
    const parts = rawTerm.split(';')
    const words = parts[0].split(',')
    
    // const extras = parts.length > 1 ? Content._extractExtrasFromRaw(parts[1]) : undefined
    
    return {
      word: words[0].removeLeadingAndTrailingSpaces(), 
      hintPrefixLength: Math.floor(words[0].length * hintPrefixRate), 
      aliases: words.length > 1 ? words.slice(1).map(w => w.removeLeadingAndTrailingSpaces()) : undefined, 
      // extras
    }
  }
  
  static aliasesStringFromTerm(term: Term): string | undefined {
    return term.aliases?.join(', ')
  }
  
  produceNextTerm(hintPrefixRate: number = 0.25): Term | undefined {
    if (this._nextIndex === undefined) {
      return undefined
    }
    
    if (this._terms) {
      const term = this._terms[this._nextIndex]
      term.hintPrefixLength = hintPrefixRate
      this._nextIndex = this._nextIndex < (this._terms!.length - 1) ? this._nextIndex + 1 : undefined
      return term
    }
    
    const term = Content.composeTerm(this._rawTerms![this._nextIndex], hintPrefixRate)
    this._nextIndex = this._nextIndex < (this._rawTerms!.length - 1) ? this._nextIndex + 1 : 0
    return term
  }
  
  searchForTerms(searchText: string, language: Language): Term[] | undefined {
    searchText = searchText.removeLeadingAndTrailingSpaces()
    if (searchText.length === 0 || !this._rawTerms) {
      return undefined
    }
    
    return this._rawTerms
      .filter(rt => searchText.localeCompare(rt.slice(0, searchText.length), language, { sensitivity: "base" }) === 0)
      .map(rt => Content.composeTerm(rt, 0))
      .sort((a, b) => a.word.localeCompare(b.word))
  }
  
  private constructor(language: Language, terms?: Term[], rawTerms?: string[]) {
    this.language = language
    this._rawTerms = rawTerms
    this._terms = terms
    this._nextIndex = terms || rawTerms ? 0 : undefined
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
}
