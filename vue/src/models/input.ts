import { substringFromIndices } from "@/assets/tungsten/stringify"

interface IInputState {
  indices: number[]
  inputableIndices: number[]
  word: string
}

export class InputState implements IInputState {
  indices: number[]
  inputableIndices: number[]
  word: string
  
  constructor(indices: number[], inputableIndices: number[], word: string) {
    this.indices = indices
    this.inputableIndices = inputableIndices
    this.word = word
  }
  
  get sortedInputableIndices() {
    return [...this.inputableIndices].sort((n1, n2) => n1 - n2)
  }
  get inputString() {
    return substringFromIndices(this.word, this.indices)
  }
  get inputableString() {
    return substringFromIndices(this.word, this.sortedInputableIndices)
  }
}
