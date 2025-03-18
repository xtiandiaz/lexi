import { ResearchTool } from "@/models/tools"
import { Icon } from "@/assets/design-tokens/iconography";
import { type ToolBarButtonVM } from "@/components/vueties/view-models";

const researchToolIcon = (tool: ResearchTool): Icon => {
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
      return Icon.Translation
  }
}

export type ResearchToolButtonVM = ToolBarButtonVM<ResearchTool>
export const researchToolButtonVMs: ResearchToolButtonVM[] = [
    ResearchTool.Define,
    ResearchTool.ImageSearch,
    ResearchTool.WikipediaSearch,
    ResearchTool.WebSearch,
    ResearchTool.Translate
  ].map((tool) => {
    return {
      tool,
      icon: researchToolIcon(tool),
      isEnabled: true
    }
  })
