import type { Language } from "@/models/localization"

export const dateLocaleString = (date: Date, language: Language): string => {
  return (date).toLocaleDateString(language, {
    month: 'long',
    day: 'numeric'
  })
}
