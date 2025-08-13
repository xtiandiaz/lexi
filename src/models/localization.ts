import type { Tool } from "./game"

export enum Language {
  English = 'en',
  Finnish = 'fi',
  Spanish = 'es',
}

export enum LocalizedStringKey {  
  Button_Test,
  
  LanguageName,
  Term,
  
  Text_SearchPlaceholder,
  Text_SearchingFor,
  Text_NumResultsFor,
  Text_NoResultsFor,
  
  Title_DailyGoal,
  Title_HistoryFromDate,
  Title_HistoryOfToday,
  Title_HistoryOfYesterday,
  Title_Languages,
  Title_Settings,
  Title_Search,
}

export interface LocalizableTool extends Tool {
  language: Language
}
