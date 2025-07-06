import type { Language } from "./localization"
import { enumKeyFromValue } from "@/assets/tungsten/enum"
import '@/assets/tungsten/extensions/array.extensions'
import '@/assets/tungsten/extensions/string.extensions'
import { getRandomChoice, getRandomInteger } from "@/assets/tungsten/randomness"

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
  readonly language: Language
  
  readonly aliases?: string[]
  readonly extras?: TermExtras
}

export interface TermExtras {
  readonly tags?: TermTag[]
  readonly metaAttributes?: TermMetaAttribute[]
}

export interface RawTermBatch {
  readonly language: Language
  readonly rawTerms: string[]
}

export class RawContent {  
  _batches?: RawTermBatch[]
  
  constructor(batches?: RawTermBatch[]) {
    this._batches = batches
  }
  
  get termCount(): number {
    return this._batches?.reduce((acc, b) => acc + b.rawTerms.length, 0) ?? 0
  }
  
  static composeTerm(rawTerm: string, hintPrefixRate: number, language: Language): Term {
    const parts = rawTerm.split(';')
    const words = parts[0].split(',')
    
    // const extras = parts.length > 1 ? Content._extractExtrasFromRaw(parts[1]) : undefined
    
    return {
      aliases: words.length > 1 ? words.slice(1).map(w => w.removeLeadingAndTrailingSpaces()) : undefined, 
      hintPrefixLength: Math.floor(words[0].length * hintPrefixRate), 
      language,
      word: words[0].removeLeadingAndTrailingSpaces(), 
      // extras
    }
  }
  
  static aliasesStringFromTerm(term: Term): string | undefined {
    return term.aliases?.join(', ')
  }
  
  produceNextTerm(hintPrefixRate: number = 0.25): Term | undefined {
    const batch = getRandomChoice(this._batches!)
    const rawTermIndex = getRandomInteger(0, batch.rawTerms.length - 1)
    const term = RawContent.composeTerm(batch.rawTerms[rawTermIndex], hintPrefixRate, batch.language)
    
    return term
  }
  
  searchForTerms(searchText: string, language: Language): Term[] | undefined {
    searchText = searchText.removeLeadingAndTrailingSpaces()
    if (searchText.length === 0) {
      return undefined
    }
    
    const batch = this._batches?.find(b => b.language === language)
    if (!batch) {
      console.error("No batch for language", language)
      return undefined
    }
    
    return batch.rawTerms
      .filter(rt => searchText.localeCompare(rt.slice(0, searchText.length), language, { sensitivity: "base" }) === 0)
      .map(rt => RawContent.composeTerm(rt, 0, language))
      .sort((a, b) => a.word.localeCompare(b.word))
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
