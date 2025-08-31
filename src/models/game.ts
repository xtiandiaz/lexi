import { Language } from "./localization";
import '@/assets/tungsten/extensions/array.extensions'

export enum GameMode {
  Exploration,
  Test
}

// export interface TermCard {
//   term: Term
// }

// export interface Deck {
//   cards: TermCard[]
//   startCardIndex: number
// }

export interface TermDeckState {
  obfuscatedCount: number
  solvedCount: number
  termCount: number
}

export interface DailyGoalSettings {
  termCount: number
}

export interface LanguageSettings {
  language: Language
  translationLanguage: Language
}

export interface Settings {
  activeLanguages: Language[]
  dailyGoal: DailyGoalSettings
  languagesSettings: LanguageSettings[]
}

