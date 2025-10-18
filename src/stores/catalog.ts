import { ref } from 'vue'
import { defineStore } from "pinia";
import type { Deck, DeckSet } from "@/models/game";
import { getCatalog, getDeckRawContent } from '@/services/content-provider'
import { generateCards } from '@/services/card-generator';

export default defineStore('catalog', () => {
  const decks = ref<Deck[]>([])
  const sets = ref<DeckSet[]>([])
  
  async function load() {
    const catalog = await getCatalog()
    decks.value = catalog.decks.sort((a, b) => a.title.localeCompare(b.title))
    sets.value = catalog.sets
  }
  
  async function getDeckAndGenerateCards(key: string): Promise<Deck> {
    if (decks.value.length == 0) {
      await load()
    }
    
    const deck = getDeck(key)!
    
    if (deck.cards == undefined) {
      const rawContent = await getDeckRawContent(key)
      deck.cards = generateCards(rawContent)
    }
    
    return deck
  }
  
  function getDeck(key: string): Deck {
    return decks.value.find(d => d.key === key)!
  }
  
  return {
    decks,
    sets,
    
    load,
    getDeckAndGenerateCards
  }
})
