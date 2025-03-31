import { ResearchTool } from "@/models/tools"
import { Language } from "@/models/language";
import type { LanguageSettings } from "@/models/settings";
import { dictionaryIcon, translationIcon } from '@/view-models/vm-language'
import { Icon } from "@/assets/design-tokens/iconography";
import { type ToolBarButtonVM } from "@vueties/view-models";

const researchToolIconForLanguage = (
  tool: ResearchTool, 
  sourceLanguage: Language,
  translationLanguage: Language
): Icon => {
  switch (tool) {
    case ResearchTool.Define:
      return dictionaryIcon(sourceLanguage)
    case ResearchTool.ImageSearch:
      return Icon.Image
    case ResearchTool.WebSearch:
      return Icon.WebSearch
    case ResearchTool.WikipediaSearch:
      return Icon.Wikipedia
    case ResearchTool.Translate:
      return translationIcon(translationLanguage)
  }
}

export type ResearchToolButtonVM = ToolBarButtonVM<ResearchTool>
export const researchToolButtonVMs = (languageSettings: LanguageSettings): ResearchToolButtonVM[] => {
  return [
    ResearchTool.Define,
    ResearchTool.WikipediaSearch,
    ResearchTool.WebSearch,
    ResearchTool.ImageSearch,
    ResearchTool.Translate,
  ].map((tool) => {
    return {
      tool,
      icon: researchToolIconForLanguage(tool, languageSettings.language, languageSettings.translationLanguage),
      isEnabled: true
    }
  })
}
