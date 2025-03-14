import { IconKey } from "@/assets/design-tokens/iconography";
import { ColorKey } from "@/assets/design-tokens/palette";
import { type ITool } from "@/components/vueties/models";

export enum WordToolKey {
  Continue = 'continue',
  Define = 'define', 
  Hint = 'hint',
  ImageSearch = 'image-search',
  WebSearch = 'web-search',
  WikipediaSearch = 'wikipedia-search'
}

export interface IWordTool extends ITool<WordToolKey> {
  color: ColorKey
}

export function wordTool(key: WordToolKey, isEnabled: boolean): IWordTool {
  let icon: IconKey, color: ColorKey
  
  switch (key) {
    case WordToolKey.Continue:
      icon = IconKey.Play
      color = ColorKey.Purple
      break
    case WordToolKey.Define:
      icon = IconKey.Dictionary
      color = ColorKey.Mint
      break
    case WordToolKey.Hint:
      icon = IconKey.Hint
      color = ColorKey.Yellow
      break
    case WordToolKey.ImageSearch:
      icon = IconKey.Image
      color = ColorKey.Indigo
      break
    case WordToolKey.WebSearch:
      icon = IconKey.Globe
      color = ColorKey.Blue
      break
    case WordToolKey.WikipediaSearch:
      icon = IconKey.Wikipedia
      color = ColorKey.Body
      break
  }
  
  return {
    key: key,
    icon: icon,
    isEnabled: isEnabled,
    color: color
  }
}
