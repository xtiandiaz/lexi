import { Language, LocalizedString } from "@/models/language";
import { localizedString, localizedStringInLanguage } from "@/services/localization";
import type { FormOptionRowVM, FormSectionVM } from "@vueties/view-models";
import { dictionaryIcon } from "./vm-language";

export const languageChoiceSectionVM = (currentLanguage: Language): FormSectionVM<FormOptionRowVM<Language>> => {
  return {
    rowVMs: Object.values(Language).map(language => {
      return {
        isSelected: language === currentLanguage,
        title: localizedStringInLanguage(LocalizedString.LanguageName, language),
        value: language,
        icon: dictionaryIcon(language)
      } as FormOptionRowVM<Language>
    }),
    title: localizedString(LocalizedString.Language)
  }
}
