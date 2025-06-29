import { Language } from '@/models/localization'
import { Icon } from '@/assets/design-tokens/iconography'

export const dictionaryIcon = (language: Language) => {
  switch (language) {
    case Language.English:
      return Icon.DictionaryEnglish
    case Language.Spanish:
      return Icon.DictionarySpanish
  }
}

export const translationIcon = (language: Language) => {
  switch (language) {
    case Language.English:
      return Icon.LanguageEnglish
    case Language.Spanish:
      return Icon.LanguageSpanish
  }
}
