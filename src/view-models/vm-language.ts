import { Language } from '@/models/localization'
import { Icon } from '@/assets/design-tokens/iconography'

export const dictionaryIcon = (language: Language) => {
  switch (language) {
    case Language.English:
      return Icon.DictionaryEnglish
    case Language.Finnish:
      return Icon.DictionaryFinnish
    case Language.Spanish:
      return Icon.DictionarySpanish
  }
}

export const translationIcon = (language: Language) => {
  switch (language) {
    case Language.English:
      return Icon.LanguageEnglish
    case Language.Finnish:
      return Icon.LanguageFinnish
    case Language.Spanish:
      return Icon.LanguageSpanish
  }
}
