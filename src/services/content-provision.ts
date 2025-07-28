import { RawContent, type RawTermBatch } from '@/models/content'
import useGameStore from '@/stores/game'
import '@/assets/tungsten/extensions/array.extensions'

const sourcePath = 'https://raw.githubusercontent.com/xtiandiaz/lexicon/refs/heads/main/src'
const availableContent: RawTermBatch[] = []

export async function loadRepositoryContent(): Promise<RawContent | undefined> {
  const game = useGameStore()
  
  for (const language of game.settings.activeLanguages) {
    if (availableContent.find(c => c.language === language)) {
      continue
    }
    
    const urlString = `${sourcePath}/terms/${language}.txt`
  
    try {
      const response = await fetch(`${urlString}?salt=${Math.random()}`)
      // console.log(response)
      const rawTerms = (await response.text()).split('\n')
      // console.log(terms)
      
      availableContent.push({ language, rawTerms })
    } catch (error) {
      console.error(`Language: ${language}`, error)
      
      return undefined
    }
  }
  
  const selectedBatches = [...game.settings.activeLanguages].compactMap(
    l => availableContent.find(b => b.language === l)
  )
  
  return new RawContent(selectedBatches)
}
