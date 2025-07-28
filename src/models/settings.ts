import { Language } from "./localization";

export interface DailyGoalSettings {
  termCount: number
}

export interface LanguageSettings {
  language: Language
  translationLanguage: Language
}

export const defaultMinTermCountForTest = 5

export interface Settings {
  activeLanguages: Language[]
  dailyGoal: DailyGoalSettings
  languagesSettings: LanguageSettings[]
  
  // TODO: Remove when revamp complete
  minTermCountForTest: number
}
