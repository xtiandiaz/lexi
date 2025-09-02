import type { DailyGoalSettings, LanguageSettings, Settings } from "@/models/game"
import { Language } from "@/models/localization"
import useGameStore from '@/stores/game'

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

export const defaultDailyGoalSettings: DailyGoalSettings = {
  termCount: 10
}

export const defaultSettings: Settings = {
  activeLanguages: [Language.Spanish],
  dailyGoal: defaultDailyGoalSettings,
  languagesSettings: defaultLanguagesSettings,
}

export const settingsAreEqual = (a: Settings, b: Settings): boolean => {
  return a.activeLanguages.equals(b.activeLanguages) &&
    a.languagesSettings.sorted().equals(b.languagesSettings.sorted()) &&
    a.dailyGoal.termCount === b.dailyGoal.termCount
}

export function cloneSettings(): Settings {
  const settings = useGameStore().settings
  
  return {
    ...settings,
    activeLanguages: [...settings.activeLanguages],
    dailyGoal: { ...settings.dailyGoal },
    languagesSettings: settings.languagesSettings.map(ls => { return { ...ls } }),
  }
}
