import settingsStore from '@/stores/settings'
import { inGameStore } from '@/stores/in-game'

export async function loadContent() {
  const inGame = inGameStore()
  if (inGame.wordListing.length > 0) {
    return
  }
  
  const settings = settingsStore()
  const url = `https://raw.githubusercontent.com/xtiandiaz/lexicon/refs/heads/main/words/${settings.activeLanguage}.txt`
  
  try {
    const response = await fetch(`${url}?salt=${Math.random()}`)
    // console.log(response)
    const wordListing = await response.text()
    // console.log(wordListing)
    inGame.wordListing = wordListing.split('\n')
  } catch (error) {
    console.error(`Language: ${settings.activeLanguage}`, error)
  }
}
