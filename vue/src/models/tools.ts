import { IconKey } from "@/assets/design-tokens/iconography";
import { ColorKey } from "@/assets/design-tokens/palette";

export enum WordToolKey {
  Continue,
  Define, 
  Hint,
  ImageSearch,
  WebSearch,
  WikipediaSearch
}

export interface IWordTool {
  key: WordToolKey,
  icon: IconKey,
  color: ColorKey
  isEnabled: boolean
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
    color: color,
    isEnabled: isEnabled
  }
}
