import { Language } from "@/models/language"
import { LocalizedStringKey } from '@/models/localization'
import { localizedString, localizedStringInLanguage } from "@/services/localization"
import type { FormOptionRowVM, FormSectionVM } from "@vueties/view-models"
import { dictionaryIcon } from "./vm-language"

export const languageChoiceSectionVM = (currentLanguage: Language): FormSectionVM<FormOptionRowVM<Language>> => {
  return {
    rowVMs: Object.values(Language).map(language => {
      return {
        isSelected: language === currentLanguage,
        title: localizedStringInLanguage(LocalizedStringKey.LanguageName, language),
        value: language,
        icon: dictionaryIcon(language)
      } as FormOptionRowVM<Language>
    }),
    title: localizedString(LocalizedStringKey.Language)
  }
}
