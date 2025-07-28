import { ResearchTool } from "@/models/tools"
import { Language } from "@/models/localization"
import type { LanguageSettings } from "@/models/settings";
import { dictionaryIcon, translationIcon } from '@/utils/localization.utils'
import { Icon } from "@/assets/design-tokens/iconography";
import type { VuetyToolbarButtonVM } from "@vueties/components/bars/view-models";

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

export type ResearchToolButtonVM = VuetyToolbarButtonVM<ResearchTool>
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
      icon: researchToolIconForLanguage(
        tool, 
        languageSettings.language, 
        languageSettings.translationLanguages.first()!
      ),
      isEnabled: true
    }
  })
}

export function produceResearchButtonVMsForLanguageSettings(
  tools: ResearchTool[], 
  languageSettings: LanguageSettings
): ResearchToolButtonVM[] {
  return tools.map(tool => {
    return {
      tool,
      icon: researchToolIconForLanguage(
        tool, 
        languageSettings.language, 
        languageSettings.translationLanguages.first()!
      ),
      isEnabled: true
    }
  })
}
