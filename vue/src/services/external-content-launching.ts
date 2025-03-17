import { WordToolKey } from "@/models/tools";
import settingsStore from "@/stores/settings"

function openPage(url: string) {
  window.open(url, '_blank')
}

export function openWordToolPage(tool: WordToolKey, word: string) {
  const settings = settingsStore()
  
  switch (tool) {
    case WordToolKey.Define:
      openPage(settings.languages.get(settings.activeLanguage)!.dictionaryUrl + word)
      break
    case WordToolKey.ImageSearch:
      openPage(settings.imageSearchUrl + word)
      break
    case WordToolKey.Translate:
      openPage(settings.translatorUrl + word)
      break
    case WordToolKey.WikipediaSearch:
      openPage(settings.wikipediaSearchUrl + word)
      break
    case WordToolKey.WebSearch:
      openPage(settings.webSearchUrl + word)
      break
    default:
      console.error(`${tool} doesn't have a page`)
  }
}
