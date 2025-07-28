import type { LanguageSettings, Settings } from "@/models/settings"
import { Language } from "@/models/localization"

export const defaultLanguagesSettings: LanguageSettings[] = [
  {
    language: Language.English,
    translationLanguage: Language.Spanish
  },
  {
    language: Language.Finnish,
    translationLanguage: Language.English
  },
  {
    language: Language.Spanish,
    translationLanguage: Language.English
  },
]

export const defaultSettings: Settings = {
  activeLanguages: [Language.English, Language.Spanish],
  dailyGoal: {
    termCount: 10
  },
  languagesSettings: defaultLanguagesSettings,
  minTermCountForTest: 5,
}
