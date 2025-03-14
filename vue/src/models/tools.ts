import { IconKey } from "@/assets/design-tokens/iconography";
import { ColorKey } from "@/assets/design-tokens/palette";

export enum ToolKey {
  Continue = 'continue',
  Define = 'define', 
  Hint = 'hint',
  ImageSearch = 'image-search',
  WebSearch = 'web-search',
  WikipediaSearch = 'wikipedia-search'
}

export interface ITool {
  key: ToolKey,
  icon: IconKey,
  color: ColorKey
  isEnabled: boolean
}

export function wordTool(key: ToolKey, isEnabled: boolean): ITool {
  let icon: IconKey, color: ColorKey
  
  switch (key) {
    case ToolKey.Continue:
      icon = IconKey.Play
      color = ColorKey.Purple
      break
    case ToolKey.Define:
      icon = IconKey.Dictionary
      color = ColorKey.Mint
      break
    case ToolKey.Hint:
      icon = IconKey.Hint
      color = ColorKey.Yellow
      break
    case ToolKey.ImageSearch:
      icon = IconKey.Image
      color = ColorKey.Indigo
      break
    case ToolKey.WebSearch:
      icon = IconKey.Globe
      color = ColorKey.Blue
      break
    case ToolKey.WikipediaSearch:
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
