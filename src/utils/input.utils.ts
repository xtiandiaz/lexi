import type { Term } from '@/models/content.models'
import type { InputState } from '@/models/input'

export const labelForKey = (key: string): string | undefined => {
  switch (key) {
    case ' ': return '_'
    default: return key
  }
}

type InputStateStrings = { 
  input: string, 
  inputable: string, 
  inputPrefix: string,
}
export const inputStringsFromState = (state: InputState): InputStateStrings => {
  const fromIndices = (indices: number[]) => indices.map(i => state.word[i]).join('')
  
  const input = fromIndices(state.indices)
  const inputable = state.word.substring(state.word.length - state.inputableIndices.length)
  
  return {
    input,
    inputable,
    inputPrefix: state.word.substring(0, state.word.length - inputable.length),
  }
}

export const canClueAtTerm = (term: Term): boolean => {
  return getClueAtTerm(term) != undefined
}

export function getClueAtTerm(term: Term): number[] | undefined {
  const inputState = term.inputState
  if (!inputState) {
    return
  }
  
  const inputStrings = inputStringsFromState(inputState)
  
  let letterMatchCount = 0
  for (let i = 0; i < inputStrings.input.length; i++) {
    if (inputStrings.input[i] !== inputStrings.inputable[i]) {
      break
    }
    letterMatchCount++
  }
  
  if (letterMatchCount >= (term.inputState!.inputableIndices.length - 1)) {
    return
  }
  
  const inputableStartIndex = inputState.word.length - inputState.inputableIndices.length
  const fixedOrExtendedSubstring = inputState.word.substring(0, letterMatchCount + 1)
  // console.log('fixedOrExtendedInput', fixedOrExtendedSubstring)
  
  return Array.range(inputableStartIndex, inputableStartIndex + fixedOrExtendedSubstring.length, 1)
}

export function clueAtTerm(term: Term): boolean {
  const clue = getClueAtTerm(term)
  if (clue) {
    term.inputState!.indices.length = 0
    term.inputState!.indices.push(...clue)
  }
  
  return clue != undefined
}
