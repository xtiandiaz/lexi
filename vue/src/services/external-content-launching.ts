import { WordTool } from "@/models/tools";
import { settingsStore } from "@/stores/settings"

function openPage(url: string) {
  window.open(url, '_blank')
}

export function openWordToolPage(tool: WordTool, word: string) {
  const settings = settingsStore()
  
  switch (tool) {
    case WordTool.Define:
      openPage(settings.languages.get(settings.activeLanguage)!.dictionaryUrl + word)
      break
    case WordTool.WikipediaSearch:
      openPage(settings.wikipediaSearchUrl + word)
      break
    case WordTool.WebSearch:
      openPage(settings.webSearchUrl + word)
      break
    case WordTool.ImageSearch:
      openPage(settings.imageSearchUrl + word)
      break
    default:
      console.error(`${tool} doesn't have a page`)
  }
}
