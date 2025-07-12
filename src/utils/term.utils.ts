import type { Term } from "@/models/content"
import type { CompletedTerm } from "@/models/history"
import { InputMarkKind } from "@/models/input"
import { Language } from "@/models/localization"
import { ResearchTool } from "@/models/tools"

export function isCompletedTermPassed(term: CompletedTerm): boolean {
  const testMark = term.inputMarks.find(im => im.kind === InputMarkKind.Test)
  
  return (testMark?.value ?? 0) > 0
}

export function termResearchTools(term: Term): ResearchTool[] {
  switch (term.language) {
    case Language.English:
    case Language.Spanish:
      return [ResearchTool.Define, ResearchTool.WebSearch, ResearchTool.ImageSearch, ResearchTool.WikipediaSearch, ResearchTool.Translate]
    case Language.Finnish:
      return [ResearchTool.Define, ResearchTool.WebSearch, ResearchTool.ImageSearch]
  }
}
