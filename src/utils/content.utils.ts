import { Language } from "@/models/localization"
import type { Term } from "@/models/content.models"

let currentTermId = 0

export function produceTerm(rawTerm: string, language: Language): Term {
  const parts = rawTerm.split(';')
  const words = parts[0].split(',')
  
  const word = words[0].removeLeadingAndTrailingSpaces()
  const aliases = words.length > 1 
    ? words.slice(1).map(w => w.removeLeadingAndTrailingSpaces()) 
    : undefined
  
  return { aliases, id: ++currentTermId, language, marks: [], word }
}
