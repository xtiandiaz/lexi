import type { AnyTool } from "@/models/tools";
import type { Term } from '@/models/content'
import { toolUrlString } from "@/utils/tool.utils";

export function launchResearchToolForTerm(tool: AnyTool, term: Term) {
  const urlString = toolUrlString(tool)
  if (!urlString) {
    console.error("Undefined URL string for tool", tool.key)
    return
  }
  
  window.open(urlString.replace('{query}', term.word), '_blank')
}
