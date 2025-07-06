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
  currentLanguage: Language
  languagesSettings: LanguageSettings[]
  minTermCountForTest: number
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
  termCount: 10
}

export const defaultLanguageSettings = (language: Language): LanguageSettings => {
  return {
    language,
    translationLanguage: translationLanguage(language),
  }
}
