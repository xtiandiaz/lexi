import type { AnyTool, LocalizableTool, Tool, TranslationalTool } from "@/models/tools";
import type { Term } from "@/models/content";
import { ToolKey } from "@/models/tools";
import { Language } from "@/models/localization"
import useGameStore from '@/stores/game'
import { translationIcon, dictionaryIcon } from "./localization.utils";
import { Icon } from "@/assets/design-tokens/iconography";
import '@/assets/tungsten/extensions/array.extensions'

const localizableToolIcon = (tool: LocalizableTool): Icon => {
  switch (tool.key) {
    case ToolKey.Define:
      return dictionaryIcon(tool.language)
    default:
      return Icon.RadioCircle
  }
}

const translationalToolIcon = (tool: TranslationalTool): Icon => {
  switch (tool.key) {
    case ToolKey.Translate:
      return translationIcon(tool.translationLanguage)
    default:
      return Icon.RadioCircle
  }
}

export const toolIcon = (tool: AnyTool): Icon => {
  switch (tool.key) {
    case ToolKey.Define:
      return localizableToolIcon(tool as LocalizableTool)

    case ToolKey.Translate:
      return translationalToolIcon(tool as TranslationalTool)
    
    case ToolKey.Hint:
      return Icon.Hint
    case ToolKey.ImageSearch:
      return Icon.Image
    case ToolKey.WebSearch:
      return Icon.WebSearch
    case ToolKey.WikipediaSearch:
      return Icon.Wikipedia
  }
}

export const localizableToolUrlString = (tool: LocalizableTool): string | undefined => {
  switch (tool.key) {
    case ToolKey.Define:
      switch (tool.language) {
        case Language.English:
          return 'https://www.merriam-webster.com/dictionary/{query}'
        case Language.Finnish:
          return 'https://www.sanakirja.org/search.php?q={query}'
        case Language.Spanish:
          return 'https://dle.rae.es/{query}'
      }
    case ToolKey.WikipediaSearch:
      return `https://${tool.language}.wikipedia.org/wiki/{query}`
    default:
      return undefined
    }
}

export const translationalToolUrlString = (tool: TranslationalTool): string | undefined => {
  switch(tool.key) {
    case ToolKey.Translate:
      switch (`${tool.language}-${tool.translationLanguage}`) {
        case 'en-es':
          return 'https://www.wordreference.com/es/translation.asp?tranword={query}'
        case 'es-en':
          return 'https://www.wordreference.com/es/en/translation.asp?spen={query}'
        default:
          return `https://translate.google.com/?sl=${tool.language}&tl=${tool.translationLanguage}&op=translate`
      }
    default:
      return undefined
  }
}

export const toolUrlString = (tool: AnyTool): string | undefined => {
  switch (tool.key) {
    case ToolKey.Define:
    case ToolKey.WikipediaSearch:
      return localizableToolUrlString(tool as LocalizableTool)
      
    case ToolKey.Translate:
      return translationalToolUrlString(tool as TranslationalTool)
    
    case ToolKey.ImageSearch:
      return 'https://duckduckgo.com/?t=ffab&iax=images&ia=images&q={query}'
    case ToolKey.WebSearch:
      return 'https://duckduckgo.com/?t=ffab&q={query}'
    default:
      return undefined
  }
}

export function produceToolsForTerm(keys: ToolKey[], term: Term): Tool[] {
  return keys.compactMap(key => {
    switch (key) {
      case ToolKey.Define:
      case ToolKey.WebSearch:
      case ToolKey.WikipediaSearch:
        return { key, language: term.language } as LocalizableTool
      case ToolKey.Hint:
      case ToolKey.ImageSearch:
        return { key } as Tool
      case ToolKey.Translate:
        const settings = useGameStore().settings
        const translationLanguage = settings.languagesSettings.find(
          ls => ls.language === term.language
        )?.translationLanguage
        
        if (!translationLanguage) {
          return undefined
        }
        return {
          key, 
          language: term.language, 
          translationLanguage
        } as TranslationalTool
    }
  })
}
