import type { CompletedTerm } from "@/models/history"
import { InputMarkKind } from "@/models/input"

export function isCompletedTermPassed(term: CompletedTerm): boolean {
  const testMark = term.inputMarks.find(im => im.kind === InputMarkKind.Test)
  
  return (testMark?.value ?? 0) > 0
}
