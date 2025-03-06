export enum GameMode {
  Words = 'Words',
  Excerpts = 'Excerpts'
}

export enum Language {
  Español = 'es',
  English = 'en'
}

export type LanguagesSettings = Map<Language, ILanguageSettings>

export interface ILanguageSettings {
  language: Language,
  dictionaryUrl: string,
  altWebSearchUrl?: string,
  altImageSearchUrl?: string
}

export interface ISettings {
  activeLanguage: Language
  imageSearchUrl: string
  webSearchUrl: string
  languages: LanguagesSettings
}
