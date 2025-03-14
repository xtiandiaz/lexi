import { ToolKey } from "@/models/tools";
import settingsStore from "@/stores/settings"

function openPage(url: string) {
  window.open(url, '_blank')
}

export function openWordToolPage(tool: ToolKey, word: string) {
  const settings = settingsStore()
  
  switch (tool) {
    case ToolKey.Define:
      openPage(settings.languages.get(settings.activeLanguage)!.dictionaryUrl + word)
      break
    case ToolKey.WikipediaSearch:
      openPage(settings.wikipediaSearchUrl + word)
      break
    case ToolKey.WebSearch:
      openPage(settings.webSearchUrl + word)
      break
    case ToolKey.ImageSearch:
      openPage(settings.imageSearchUrl + word)
      break
    default:
      console.error(`${tool} doesn't have a page`)
  }
}
