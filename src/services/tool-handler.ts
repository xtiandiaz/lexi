import { InputTool, ResearchTool } from "@/models/tools";
import type { InputState } from "@/models/input"
import { Language } from "@/models/language";
import settingsStore from "@/stores/settings"

const dictionaryURLString = (language: Language): string => {
  switch (language) {
    case Language.English:
      return 'https://www.wordreference.com/definition/'
    case Language.Spanish:
      return 'https://dle.rae.es/'
  }
}

const translatorURLString = (languages: [string, string]): string | undefined => {  
  switch (languages.join('-')) {
    case 'en-es':
      return 'https://www.wordreference.com/es/translation.asp?tranword='
    case 'es-en':
      return 'https://www.wordreference.com/es/en/translation.asp?spen='
    default:
      return undefined
  }
}

const researchUrlString = (tool: ResearchTool, language: Language): string => {
  switch (tool) {
    case ResearchTool.Define:
      return dictionaryURLString(language)
    case ResearchTool.ImageSearch:
      return 'https://duckduckgo.com/?t=ffab&iax=images&ia=images&q='
    case ResearchTool.Translate:
      const settings = settingsStore()
      const languageSettings = settings.languageSettings(language)
      
      return translatorURLString([language, languageSettings.translationLanguage])!
    case ResearchTool.WikipediaSearch:
      return `https://${language}.wikipedia.org/wiki/`
    case ResearchTool.WebSearch:
      return 'https://duckduckgo.com/?t=ffab&q='
  }
}

export function launchResearchToolForWord(tool: ResearchTool, word: string) {
  const settings = settingsStore()

  window.open(researchUrlString(tool, settings.currentLanguage) + word, '_blank')
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
  
  const inputableStartIndex = state.source.term.word.length - state.inputableIndices.length
  const fixedOrExtendedSubstring = state.source.term.word.substring(0, letterMatchCount + 1)
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
