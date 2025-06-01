import { Language } from "@/models/language"
import { LocalizedStringKey } from '@/models/localization'
import { localizedString, localizedStringInLanguage } from "@/services/localization"
import type { VuetyFormOptionRowVM, VuetyFormSectionVM } from "@vueties/components/form/view-models"
import { dictionaryIcon } from "./vm-language"

export const languageChoiceSectionVM = (currentLanguage: Language): VuetyFormSectionVM<VuetyFormOptionRowVM<Language>> => {
  return {
    rowVMs: Object.values(Language).map(language => {
      return {
        isSelected: language === currentLanguage,
        title: localizedStringInLanguage(LocalizedStringKey.LanguageName, language),
        value: language,
        icon: dictionaryIcon(language)
      } as VuetyFormOptionRowVM<Language>
    }),
    title: localizedString(LocalizedStringKey.Language)
  }
}
