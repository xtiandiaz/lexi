import type { Language } from './language'
import type { Term } from './content'
import '@/assets/tungsten/extensions/array.extensions'
import { substringFromIndices } from "@/assets/tungsten/stringify"

export interface InputSource {
  readonly language: Language
  readonly term: Term
}

export enum InputMarkKind {
  Hint = 'hint',
  Test = 'test'
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
    this.inputableIndices = (Array.range(source.term.hintPrefixLength, source.term.baseWord.length, 1)).shuffle()
    this.source = source
  }
  
  get isComplete() {
    return this.prefixedInputString === this.source.term.baseWord
  }
  
  get sortedInputableIndices() {
    return [...this.inputableIndices].sort((n1, n2) => n1 - n2)
  }
  
  get hintPrefixString() {
    return this.source.term.baseWord.substring(0, this.source.term.hintPrefixLength)
  }
  get inputString() {
    return substringFromIndices(this.source.term.baseWord, this.indices)
  }
  get inputableString() {
    return substringFromIndices(this.source.term.baseWord, this.sortedInputableIndices)
  }
  get prefixedInputString() {
    return this.hintPrefixString + this.inputString
  }
  
  addMark(kind: InputMarkKind, value: number) {
    const mark = this.marks.find(m => m.kind === kind)
    if (mark) {
      mark.value += value
    } else {
      this.marks.push({ kind, value })
    }
  }
  
  resetMark(kind: InputMarkKind) {
    const markIndex = this.marks.findIndex(m => m.kind === kind)
    if (markIndex >= 0) {
      this.marks.splice(markIndex, 1)
    }
  }
}
