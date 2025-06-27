import type { Language } from './language'
import type { Term } from './content'
import type { GameMode } from './game'
import { substringFromIndices } from "@/assets/tungsten/stringify"
import '@/assets/tungsten/extensions/array.extensions'

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
  
  firstAvailableInputableCharIndex(char: string): number
  toJSON(): object
}

export class UserInput implements InputState {
  readonly marks: InputMark[] = []
  
  indices: number[]
  inputableIndices: number[]
  mode: GameMode
  source: InputSource
  
  constructor(source: InputSource, mode: GameMode, indices: number[] = []) {
    this.indices = indices
    this.inputableIndices = (Array.range(source.term.hintPrefixLength, source.term.word.length, 1)).shuffle()
    this.mode = mode
    this.source = source
  }
  
  get isComplete() {
    return this.prefixedInputString === this.source.term.word.toLowerCase()
  }
  
  get sortedInputableIndices() {
    return [...this.inputableIndices].sort((n1, n2) => n1 - n2)
  }
  
  get hintPrefixString() {
    return this.source.term.word.substring(0, this.source.term.hintPrefixLength)
  }
  get inputString() {
    return substringFromIndices(this.source.term.word, this.indices)
  }
  get inputableString() {
    return substringFromIndices(this.source.term.word, this.sortedInputableIndices)
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
  
  firstAvailableInputableCharIndex(char: string): number {
    if (!/[a-z \-áéíóúüàèìòù]/i.test(char)) {
      return -1
    }
    
    for (let i = 0; i < this.inputableIndices.length; i++) {
      const indexInWord = this.inputableIndices[i]
      const charInWord = this.source.term.word[indexInWord]
      
      if (charInWord === char && !this.indices.includes(indexInWord)) {
        return indexInWord
      }
    }
    
    return -1
  }
  
  toJSON(): object {
    return { ...this, isComplete: this.isComplete }
  }
}
