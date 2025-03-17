import { IconKey } from "@/assets/design-tokens/iconography";
import { type ITool } from "@/components/vueties/models";

export enum WordToolKey {
  Continue = 'continue',
  Define = 'define',
  Hint = 'hint',
  ImageSearch = 'image-search',
  Translate = 'translate',
  WebSearch = 'web-search',
  WikipediaSearch = 'wikipedia-search'
}

export const wordTool = (key: WordToolKey, isEnabled: boolean = true): ITool<WordToolKey> => {
  let icon: IconKey
  
  switch (key) {
    case WordToolKey.Continue:
      icon = IconKey.ArrowRight
      break
    case WordToolKey.Define:
      icon = IconKey.Dictionary
      break
    case WordToolKey.Hint:
      icon = IconKey.Hint
      break
    case WordToolKey.ImageSearch:
      icon = IconKey.Image
      break
    case WordToolKey.Translate:
      icon = IconKey.Translation
      break
    case WordToolKey.WebSearch:
      icon = IconKey.WebSearch
      break
    case WordToolKey.WikipediaSearch:
      icon = IconKey.Wikipedia
      break
  }
  
  return {
    key: key,
    icon: icon,
    isEnabled: isEnabled
  }
}
