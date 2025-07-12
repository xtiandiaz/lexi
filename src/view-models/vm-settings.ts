import { Language } from "@/models/localization"
import { LocalizedStringKey } from '@/models/localization'
import { localizedStringInLanguage } from "@/services/localization"
import type { VuetyFormOptionRowVM, VuetyFormSectionVM } from "@vueties/components/form/view-models"
import { dictionaryIcon } from "./vm-language"

export function produceLanguageChoiceSectionVM(
  currentSelection: Language[]
): VuetyFormSectionVM<VuetyFormOptionRowVM<Language>> {
  const languages = Object.values(Language).map(l => {
    return {    
      code: l,
      title: localizedStringInLanguage(LocalizedStringKey.LanguageName, l),
    }
  }).sort((a, b) => a.title.localeCompare(b.title))
  
  return {
    rowVMs: languages.map(l => {
      return {
        isSelected: currentSelection.includes(l.code),
        title: l.title,
        value: l.code,
        icon: dictionaryIcon(l.code)
      } as VuetyFormOptionRowVM<Language>
    }),
    title: localizedStringInLanguage(LocalizedStringKey.Title_Language, currentSelection[0])
  }
}
