export enum GameMode {
  Words = 'Words',
  Excerpts = 'Excerpts'
}

export enum Language {
  Español = 'es',
  English = 'en'
}

export interface ISettings {
  language: Language,
  mode: GameMode
}
