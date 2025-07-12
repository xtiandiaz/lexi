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
  languagesSettings: LanguageSettings[]
  minTermCountForTest: number
  preferredLanguage: Language
}

export const translationLanguage = (language: Language) => {
  switch (language) {
    case Language.English:
      return Language.Spanish
    case Language.Finnish:
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
