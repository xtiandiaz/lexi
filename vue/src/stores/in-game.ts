import { defineStore } from "pinia";
import { ref } from "vue";

export interface IActiveWordState {
  inputable: number[],
  input: number[],
  hintPrefix: string,
  word: string
}

export const inGameStore = defineStore('in-game', {
  state: () => {
    const wordListing = ref<string[]>([])
    const activeWordItem = ref<string>()
    const activeWordState = ref<IActiveWordState>()
    
    function randomWordItem(): string {
      return wordListing.value[Math.floor(Math.random() * wordListing.value.length)]
    }
    
    function resetActiveWordItem(): string {
      activeWordItem.value = randomWordItem()
      activeWordState.value = undefined
      return activeWordItem.value
    }
    
    return {
      activeWordItem,
      activeWordState,
      wordListing,
      resetActiveWordItem
    }
  }
})
