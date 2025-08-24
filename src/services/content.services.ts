import { dailyTermCountCapPerLanguage } from '@/constants'
import type { Term, RawLanguageContent, LanguageTermCollection } from '@/models/content.models'
import { Language } from '@/models/localization'
import '@/assets/tungsten/extensions/array.extensions'
import '@/assets/tungsten/extensions/string.extensions'

const sourcePath = 'https://raw.githubusercontent.com/xtiandiaz/lexicon/refs/heads/main/src'
const rawContent: RawLanguageContent[] = []

let currentTermId = 0

function produceTerm(rawTerm: string, language: Language): Term {
  const parts = rawTerm.split(';')
  const words = parts[0].split(',')
  
  const word = words[0].removeLeadingAndTrailingSpaces()
  const aliases = words.length > 1 
    ? words.slice(1).map(w => w.removeLeadingAndTrailingSpaces()) 
    : undefined
  
  return { aliases, id: ++currentTermId, language, marks: [], word }
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
