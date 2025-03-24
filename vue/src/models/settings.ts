import { Language } from "./language";

export interface DailyGoalSettings {
  termCount: number
}

export interface LanguageSettings {
  language: Language,
  translationLanguage: Language,
  dailyGoal: DailyGoalSettings
}

export interface Settings {
  currentLanguage: Language
  languagesSettings: LanguageSettings[]
}

export const translationLanguage = (language: Language) => {
  switch (language) {
    case Language.English:
      return Language.Spanish
    case Language.Spanish:
      return Language.English
  }
}

export const defaultDailyGoalSettings: DailyGoalSettings = {
  termCount: 3
}

export const defaultLanguageSettings = (language: Language): LanguageSettings => {
  return {
    language,
    translationLanguage: translationLanguage(language),
    dailyGoal: defaultDailyGoalSettings
  }
}
