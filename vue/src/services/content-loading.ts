import settingsStore from '@/stores/settings'
import contentStore from '@/stores/content'

export async function loadLexicon() {
  const settings = settingsStore()
  const content = contentStore()
  
  if (content.lexicon?.language === settings.currentLanguage) {
    return
  }
  
  const urlString = `https://raw.githubusercontent.com/xtiandiaz/lexicon/refs/heads/main/terms/${settings.currentLanguage}.txt`
  
  try {
    const response = await fetch(`${urlString}?salt=${Math.random()}`)
    // console.log(response)
    const terms = (await response.text()).split('\n')
    // console.log(terms)
    
    content.lexicon = {
      language: settings.currentLanguage,
      terms
    }
  } catch (error) {
    console.error(`Language: ${settings.currentLanguage}`, error)
  }
}
