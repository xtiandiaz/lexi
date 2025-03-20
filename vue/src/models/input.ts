import type { Language } from './language'
import '@/assets/tungsten/extensions/array.extensions'
import { substringFromIndices } from "@/assets/tungsten/stringify"

export interface InputSource {
  readonly baseWord: string
  readonly hintPrefixLength: number
  readonly language: Language
  readonly linkedWords: string[]
}

export enum InputMarkKind {
  Hints = 'hints',
  Tests = 'tests'
}

export interface InputMark {
  readonly kind: InputMarkKind
  value: number
}

export interface InputState {
  readonly indices: number[]
  readonly inputableIndices: number[]
  readonly marks: InputMark[]
  readonly source: InputSource
  
  readonly isComplete: boolean
  
  readonly inputString: string
  readonly inputableString: string
  readonly prefixedInputString: string
  
}

export class UserInput implements InputState {
  readonly marks: InputMark[] = []
  
  indices: number[]
  inputableIndices: number[]
  source: InputSource
  
  constructor(source: InputSource, indices: number[] = []) {
    this.indices = indices
    this.inputableIndices = (Array.range(source.hintPrefixLength, source.baseWord.length, 1)).shuffle()
    this.source = source
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
  
  addCompletionMark(kind: InputMarkKind, value: number) {
    const mark = this.marks.find(m => m.kind === kind)
    if (mark) {
      mark.value += value
    } else {
      this.marks.push({ kind, value })
    }
  }
}
