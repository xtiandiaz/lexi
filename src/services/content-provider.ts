import { dailyTermCountCapPerLanguage } from '@/constants'
import type { RawLanguageContent, LanguageTermCollection } from '@/models/content'
import { Language } from '@/models/localization'
import { produceTerm } from '@/utils/content.utils'
import type { Deck, Catalog } from '@/models/game'
import { generateCards } from './card-generator'
import '@/assets/tungsten/extensions/array.extensions'
import '@/assets/tungsten/extensions/string.extensions'

const sourcePath = 'https://raw.githubusercontent.com/xtiandiaz/lexicon/refs/heads/main/src'
const rawContent: RawLanguageContent[] = []

export async function getCatalog(): Promise<Catalog> {
  return await (await fetch('/catalog.json')).json() as Catalog
}

export async function getDeckRawContent(key: string): Promise<string> {
  return await (await fetch(`/decks/${key}.txt`)).text()
}

export async function loadContent(languages: Language[]): Promise<LanguageTermCollection[]> {  
  for (const language of languages) {
    if (rawContent.find(c => c.language === language)) {
      continue
    }
    
    const urlString = `${sourcePath}/terms/${language}.txt`
  
    try {
      const response = await fetch(`${urlString}?salt=${Math.random()}`)
      // console.log(response)
      const rawTerms = (await response.text()).split('\n').shuffle()
      // console.log(terms)
      
      rawContent.push({ language, rawTerms })
    } catch (error) {
      console.error(`Language: ${language}`, error)
      
      return []
    }
  }
  
  return languages
    .compactMap(l => rawContent.find(rc => rc.language === l))
    .map(rc => {
      const slice = rc.rawTerms.slice(0, dailyTermCountCapPerLanguage)
      return {
        language: rc.language,
        terms: slice.map(rt => produceTerm(rt, rc.language))
      }
    })
}
