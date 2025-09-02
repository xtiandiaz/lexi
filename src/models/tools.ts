import { Language } from "./localization"

export enum ToolKey {
  Clue = 'clue',
  Define = 'define',
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

export interface TranslationTool extends LocalizableTool {
  translationLanguage: Language
}

export type AnyTool = Tool | LocalizableTool | TranslationTool
