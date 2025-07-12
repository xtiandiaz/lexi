import { LocalizedStringKey } from "@/models/localization";

export default new Map<LocalizedStringKey, string>([
  [LocalizedStringKey.Button_Test, "Test"],
  
  [LocalizedStringKey.LanguageName, "Suomi"],
  [LocalizedStringKey.Term, "termi"],
  
  [LocalizedStringKey.Text_SearchingFor, "Etsimässä"],
  [LocalizedStringKey.Text_SearchPlaceholder, "Etsi termiä"],
  [LocalizedStringKey.Text_NumResultsFor, "tuloksia haulle"],
  [LocalizedStringKey.Text_NoResultsFor, "Ei tuloksia haulle"],
  
  [LocalizedStringKey.Title_HistoryFromDate, "History päivästä lähtien {date}"],
  [LocalizedStringKey.Title_HistoryOfToday, "Tämän päivän historia"],
  [LocalizedStringKey.Title_HistoryOfYesterday, "Eilisen historia"],
  [LocalizedStringKey.Title_Language, "Kieli"],
  [LocalizedStringKey.Title_Settings, "Asetukset"],
  [LocalizedStringKey.Title_Search, "Etsi termejä"],
])
