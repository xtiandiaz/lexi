import { InputTool, ResearchTool } from "@/models/tools";
import type { InputState } from "@/models/input"
import settingsStore from "@/stores/settings"

export function launchResearchToolForWord(tool: ResearchTool, word: string) {
  function openPage(url: string) {
    window.open(url, '_blank')
  }
  
  const settings = settingsStore()
    
  switch (tool) {
    case ResearchTool.Define:
      openPage(settings.languages.get(settings.activeLanguage)!.dictionaryUrl + word)
      break
    case ResearchTool.ImageSearch:
      openPage(settings.imageSearchUrl + word)
      break
    case ResearchTool.Translate:
      openPage(settings.translatorUrl + word)
      break
    case ResearchTool.WikipediaSearch:
      openPage(settings.wikipediaSearchUrl + word)
      break
    case ResearchTool.WebSearch:
      openPage(settings.webSearchUrl + word)
      break
    default:
      console.error(`${tool} doesn't have a page`)
  }
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
  
  const inputableStartIndex = state.word.length - state.inputableIndices.length
  const fixedOrExtendedSubstring = state.word.substring(0, letterMatchCount + 1)
  // console.log('fixedOrExtendedInput', fixedOrExtendedSubstring)
  
  return Array.range(inputableStartIndex, inputableStartIndex + fixedOrExtendedSubstring.length, 1)
}

export function canUseInputTool(tool: InputTool, inputState: InputState): boolean {
  switch (tool) {
    case InputTool.Hint:
      return fixOrExtendInput(inputState) !== undefined
  }
}

export function produceInputWithTool(tool: InputTool, inputState: InputState): number[] | undefined {
  switch (tool) {
    case InputTool.Hint:
      return fixOrExtendInput(inputState)
  }
}
