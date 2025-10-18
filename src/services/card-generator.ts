import type { Card, Deck } from '@/models/game'
import { Color } from '@/assets/design-tokens/palette'
import { Language } from '@/models/localization'
import '@/assets/tungsten/extensions/string.extensions'
import type { Term } from '@/models/content'

interface DeckSection {
  languages: Language[]
  rawTerms: string[]
}

function parseSection(rawSection: string): DeckSection {  
  const langsRegExp = /---\[(\w{2}(:{1,2}\w{2})?)\]/
  const lines = rawSection.split('\n')
  const languages = lines[0].match(langsRegExp)?.[1]?.split(/:{1,2}/).map(rl => rl as Language) ?? []
  
  return {
    languages,
    rawTerms: lines.slice(1)
  }
}

function parseTerm(rawTerm: string, language?: Language): Term {
  const parts = rawTerm.split(';').map(p => p.removeLeadingAndTrailingSpaces())
  
  return {
    word: parts[0],
    aliases: parts.length > 1 ? parts.slice(1) : undefined,
    language,
  }
}

function parseCard(rawCard: string, languages: Language[]): Card | undefined {
  // const cardRegExp = /^(.*)\s+::\s+(.*)$/
  const rawTerms = rawCard.split('::').map(s => s.removeLeadingAndTrailingSpaces())
  
  const card: Card = {
    frontTerm: parseTerm(rawTerms[0], languages[0]),
    backTerm: rawTerms.length > 1 ? parseTerm(rawTerms[1], languages[1]) : undefined
  }
  
  return card
}

export function generateCards(rawContent: string): Card[] {
  // const sectionRegExp = /^---\[(\w{2}:{1,2}\w{2})\]$/mg  
  const sectionRegExp = /---((?!---).)*/msg
  
  const sectionMatch = rawContent.match(sectionRegExp)
  const sections = sectionMatch?.map(rs => parseSection(rs.removeLeadingAndTrailingSpaces())) ?? []
  // console.log(sections)
  
  const cards = sections.map(s => s.rawTerms.compactMap(rc => parseCard(rc, s.languages))).flatMap(c => c)
  // console.log(cards)
  
  return cards
}
