import type { Language } from "@/models/language"

export class WordProvider {
  language: Language
  
  private _words: string[] = []
  
  constructor(language: Language) {
    this.language = language
  }
  
  async load() {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/xtiandiaz/lexicon/refs/heads/main/words/es.txt?salt=${Math.random()}`)
      // console.log(response)
      const wordListing = await response.text()
      // console.log(wordListing)
      this._words = wordListing.split('\n')
    } catch (error) {
      console.error(`Language: ${this.language}`, error)
    }
  }
  
  getRandomWord(): string {
    return this._words[Math.floor(Math.random() * this._words.length)]
  }
}
