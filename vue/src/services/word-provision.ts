import settingsStore from '@/stores/settings'
import contentStore from '@/stores/content'

export async function loadContent() {
  const content = contentStore()
  if (content.termListing.length > 0) {
    return
  }
  
  const settings = settingsStore()
  const url = `https://raw.githubusercontent.com/xtiandiaz/lexicon/refs/heads/main/words/${settings.currentLanguage}.txt`
  
  try {
    const response = await fetch(`${url}?salt=${Math.random()}`)
    // console.log(response)
    const termListing = await response.text()
    // console.log(termListing)
    content.termListing = termListing.split('\n')
  } catch (error) {
    console.error(`Language: ${settings.currentLanguage}`, error)
  }
}
