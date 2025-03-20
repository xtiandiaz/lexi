import { Language } from '@/models/language'
import { Icon } from '@/assets/design-tokens/iconography'

export const languageIcon = (language: Language) => {
  switch (language) {
    case Language.English:
      return Icon.LanguageEnglish
    case Language.Spanish:
      return Icon.LanguageSpanish
  }
}
