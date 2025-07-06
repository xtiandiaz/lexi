import { Language } from "@/models/localization"
import { LocalizedStringKey } from '@/models/localization'
import { localizedStringInLanguage } from "@/services/localization"
import type { VuetyFormOptionRowVM, VuetyFormSectionVM } from "@vueties/components/form/view-models"
import { dictionaryIcon } from "./vm-language"

export function produceLanguageChoiceSectionVM(
  currentSelection: Language[]
): VuetyFormSectionVM<VuetyFormOptionRowVM<Language>> {  
  return {
    rowVMs: Object.values(Language).map(l => {
      return {
        isSelected: currentSelection.includes(l),
        title: localizedStringInLanguage(LocalizedStringKey.LanguageName, l),
        value: l,
        icon: dictionaryIcon(l)
      } as VuetyFormOptionRowVM<Language>
    }),
    title: localizedStringInLanguage(LocalizedStringKey.Title_Language, currentSelection[0])
  }
}
