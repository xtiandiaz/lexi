import { ResearchTool } from "@/models/tools"
import { Language } from "@/models/language";
import { languageIcon } from '@/view-models/vm-language'
import { Icon } from "@/assets/design-tokens/iconography";
import { type ToolBarButtonVM } from "@/components/vueties/view-models";

const researchToolIconForLanguage = (tool: ResearchTool, language: Language): Icon => {
  switch (tool) {
    case ResearchTool.Define:
      return Icon.Dictionary
    case ResearchTool.ImageSearch:
      return Icon.Image
    case ResearchTool.WebSearch:
      return Icon.WebSearch
    case ResearchTool.WikipediaSearch:
      return Icon.Wikipedia
    case ResearchTool.Translate:
      return languageIcon(language)
  }
}

export type ResearchToolButtonVM = ToolBarButtonVM<ResearchTool>
export const researchToolButtonVMs = (translationLanguage: Language): ResearchToolButtonVM[] => {
  return [
    ResearchTool.Define,
    ResearchTool.ImageSearch,
    ResearchTool.WikipediaSearch,
    ResearchTool.WebSearch,
    ResearchTool.Translate
  ].map((tool) => {
    return {
      tool,
      icon: researchToolIconForLanguage(tool, translationLanguage),
      isEnabled: true
    }
  })
}
