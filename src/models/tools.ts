import { Language } from "./localization"

export enum ToolKey {
  Define = 'define',
  Hint = 'hint',  
  ImageSearch = 'image-search',
  Translate = 'translate',
  WebSearch = 'web-search',
  WikipediaSearch = 'wikipedia-search'
}

export interface Tool {
  readonly key: ToolKey
}

export interface LocalizableTool extends Tool {
  language: Language
}

export interface TranslationalTool extends LocalizableTool {
  translationLanguage: Language
}

export type AnyTool = Tool | LocalizableTool | TranslationalTool
