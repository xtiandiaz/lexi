import { ToolKey } from "@/models/tools";
import type { Term, TermMark } from '@/models/content.models'
import { TermMarkKind } from "@/models/content.models";
import '@/assets/tungsten/extensions/array.extensions'
import { Icon } from "@/assets/design-tokens/iconography";

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
