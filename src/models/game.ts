import { Language } from "./localization";
import type { Term } from "./content";
import type { Color } from "@/assets/design-tokens/palette";
import '@/assets/tungsten/extensions/array.extensions'

export enum GameMode {
  Exploration,
  Test
}

export interface Card {
  // id: number
  frontTerm: Term
  backTerm?: Term
}

export interface Deck {
  title: string
  color: Color
  key: string
  sets: string[]
  cards?: Card[]
}

export interface DeckSet {
  title: string
  decks: Deck[]
}

export interface Catalog {
  sets: DeckSet[]
  decks: Deck[]
}

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

