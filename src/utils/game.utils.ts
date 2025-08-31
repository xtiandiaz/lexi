import { ToolKey } from "@/models/tools";
import type { Term, TermMark } from '@/models/content'
import { TermMarkKind } from "@/models/content";
import '@/assets/tungsten/extensions/array.extensions'
import { Icon } from "@/assets/design-tokens/iconography";
import type { TermDeckState } from "@/models/game";

export const researchToolKeysInDisplayOrder = [
  ToolKey.Define,
  ToolKey.WebSearch,
  ToolKey.ImageSearch,
  ToolKey.WikipediaSearch,
  ToolKey.Translate
]

export const termMarkIcon = (kind: TermMarkKind) => {
  switch (kind) {
    case TermMarkKind.Clue: return Icon.Hint
  }
}

export const obfuscatedSlabFromTerm = (term: Term): string => {
  if (!term.inputState) {
    return ''
  }
  return Array.range(0, term.inputState.inputableIndices.length).map(() => '•').join('')
}

export const obfuscatedWordHTMLFromTerm = (term: Term): string | undefined => {
  if (!term.inputState) {
    return undefined
  }
  return `${term.word.substring(0, term.word.length - term.inputState.inputableIndices.length)}<span class='obfuscated'>${obfuscatedSlabFromTerm(term)}</span>`
}

export function prepareTermToGuess(term: Term): Term {
  const inputableLength = term.word.length <= 3 ? term.word.length : Math.floor(term.word.length * 0.75)
    
  term.inputState = {
    indices: [],
    inputableIndices: Array.range(term.word.length - inputableLength, term.word.length).shuffle(),
    word: term.word
  }
  
  return term
}

export function markTerm(mark: TermMark, term: Term) {
  const currentMark = term.marks.find(m => m.kind === mark.kind)
  if (currentMark) {
    currentMark.value += mark.value
  } else {
    term.marks.push(mark)
  }
}

export function getDeckStateFromTerms(terms: Term[]): TermDeckState {
  const obfuscatedCount = terms.filter(t => t.inputState != undefined).length
  
  return {
    obfuscatedCount,
    solvedCount: terms.length - obfuscatedCount,
    termCount: terms.length
  }
}
