import { ToolKey } from "@/models/tools";
import type { AnyTool } from "@/models/tools";
import type { Term } from '@/models/content.models'
import type { InputState } from "@/models/input"
import { toolUrlString } from "@/utils/tool.utils";

export function launchResearchToolForTerm(tool: AnyTool, term: Term) {
  const urlString = toolUrlString(tool)
  if (!urlString) {
    console.error("Undefined URL string for tool", tool.key)
    return
  }
  
  window.open(urlString.replace('{query}', term.word), '_blank')
}

function fixOrExtendInput(state: InputState): number[] | undefined {
  const input = state.inputString
  const inputable = state.inputableString
  // console.log('inputable indices', state.inputableIndices, 'sorted', state.sortedInputableIndices)
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
  
  const inputableStartIndex = state.term.word.length - state.inputableIndices.length
  const fixedOrExtendedSubstring = state.term.word.substring(0, letterMatchCount + 1)
  // console.log('fixedOrExtendedInput', fixedOrExtendedSubstring)
  
  return Array.range(inputableStartIndex, inputableStartIndex + fixedOrExtendedSubstring.length, 1)
}

export function canUseInputTool(key: ToolKey, inputState: InputState): boolean {
  switch (key) {
    case ToolKey.Clue:
      return fixOrExtendInput(inputState) !== undefined
    default:
      return false
  }
}

export function produceInputWithTool(key: ToolKey, inputState: InputState): number[] | undefined {
  switch (key) {
    case ToolKey.Clue:
      return fixOrExtendInput(inputState)
    default:
      return undefined
  }
}
