import { LocalizedStringKey } from "@/models/localization";

export default new Map<LocalizedStringKey, string>([
  [LocalizedStringKey.Button_Test, "Evaluar"],
  
  [LocalizedStringKey.LanguageName, "Español"],
  [LocalizedStringKey.Term, "término"],
  
  [LocalizedStringKey.Text_SearchPlaceholder, "Buscar término"],
  [LocalizedStringKey.Text_SearchingFor, "Buscando"],
  [LocalizedStringKey.Text_NumResultsFor, "resultados para"],
  [LocalizedStringKey.Text_NoResultsFor, "Sin resultados para"],
  
  [LocalizedStringKey.Title_HistoryFromDate, "Historial del {date}"],
  [LocalizedStringKey.Title_HistoryOfToday, "Historial de Hoy"],
  [LocalizedStringKey.Title_HistoryOfYesterday, "Historial de Ayer"],
  [LocalizedStringKey.Title_Languages, "Idiomas"],
  [LocalizedStringKey.Title_Settings, "Configuración"],
  [LocalizedStringKey.Title_Search, "Buscar Términos"],
])
