import { LocalizedStringKey } from "@/models/localization";

export default new Map<LocalizedStringKey, string>([
  [LocalizedStringKey.Button_Test, "Test"],
  
  [LocalizedStringKey.LanguageName, "English"],
  [LocalizedStringKey.Term, "term"],
  
  [LocalizedStringKey.Text_SearchingFor, "Searching for"],
  [LocalizedStringKey.Text_SearchPlaceholder, "Search for term"],
  [LocalizedStringKey.Text_NumResultsFor, "results for"],
  [LocalizedStringKey.Text_NoResultsFor, "No results for"],
  
  [LocalizedStringKey.Title_HistoryFromDate, "History from {date}"],
  [LocalizedStringKey.Title_HistoryOfToday, "Today's History"],
  [LocalizedStringKey.Title_HistoryOfYesterday, "Yesterday's History"],
  [LocalizedStringKey.Title_Languages, "Languages"],
  [LocalizedStringKey.Title_Settings, "Settings"],
  [LocalizedStringKey.Title_Search, "Search for Terms"],
])
