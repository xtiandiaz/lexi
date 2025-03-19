import '@/assets/tungsten/extensions/array.extensions'
import { substringFromIndices } from "@/assets/tungsten/stringify"

export interface InputSource {
  readonly baseWord: string
  readonly hintPrefixLength: number
  readonly linkedWords: string[]
}

export interface InputState {
  readonly hintCount: number
  readonly indices: number[]
  readonly inputableIndices: number[]
  readonly source: InputSource
  
  isComplete: boolean
  
  inputString: string
  inputableString: string
  prefixedInputString: string
}

export class UserInput implements InputState {
  hintCount = 0
  indices: number[]
  inputableIndices: number[]
  source: InputSource
  
  constructor(source: InputSource, indices: number[] = []) {
    this.source = source
    this.indices = indices
    this.inputableIndices = (Array.range(source.hintPrefixLength, source.baseWord.length, 1)).shuffle()
  }
  
  get isComplete() {
    return this.prefixedInputString === this.source.baseWord
  }
  
  get sortedInputableIndices() {
    return [...this.inputableIndices].sort((n1, n2) => n1 - n2)
  }
  
  get hintPrefixString() {
    return this.source.baseWord.substring(0, this.source.hintPrefixLength)
  }
  get inputString() {
    return substringFromIndices(this.source.baseWord, this.indices)
  }
  get inputableString() {
    return substringFromIndices(this.source.baseWord, this.sortedInputableIndices)
  }
  get prefixedInputString() {
    return this.hintPrefixString + this.inputString
  }
}
