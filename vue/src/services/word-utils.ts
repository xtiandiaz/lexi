import '@/assets/tungsten/extensions/array.extensions'
import { substringFromIndices } from "@/assets/tungsten/stringify"

export function canHint(word: string, inputIndices: number[], inputableIndices: number[]): boolean {
  return fixOrExtendInput(word, inputIndices, inputableIndices) !== undefined
}

export function fixOrExtendInput(
  word: string, 
  inputIndices: number[], 
  inputableIndices: number[]
): number[] | undefined {
  const sortedInputableIndices = [...inputableIndices].sort((n1, n2) => n1 - n2)
  const input = substringFromIndices(word, inputIndices)
  const inputable = substringFromIndices(word, sortedInputableIndices)
  // console.log('inputable indices', inputableIndices, 'sorted', sortedInputableIndices)
  // console.log('input:', input, 'inputable:', inputable)
  
  let letterMatchCount = 0
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== inputable[i]) {
      break
    }
    letterMatchCount++
  }
  
  if (letterMatchCount >= (inputable.length - 1)) {
    return undefined
  }
  
  const inputableStartIndex = word.length - inputableIndices.length
  const fixedOrExtendedSubstring = word.substring(0, letterMatchCount + 1)
  // console.log('fixedOrExtendedInput', fixedOrExtendedSubstring)
  
  return Array.range(inputableStartIndex, inputableStartIndex + fixedOrExtendedSubstring.length, 1)
}
