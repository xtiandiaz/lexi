import type { Term } from "./content";
import { clamp } from "@/assets/tungsten/math";

export enum GameMode {
  Exploration,
  Test
}

export class Test {
  _completedTermCount = 0
  _currentIndex = -1
  _terms: Term[]
  
  constructor(terms: Term[]) {
    this._terms = terms.shuffled()
  }
  
  get progress(): number {
    return clamp(this._completedTermCount / this._terms.length, 0, 1)
  }
  
  get _currentTerm(): Term {
    return this._terms[this._currentIndex]
  }
  
  produceNextTerm(): Term | undefined {    
    if (this._currentIndex >= this._terms.length) {
      return undefined
    }
    
    this._currentIndex += 1
    
    return this._currentTerm
  }
  
  makeProgressWithTerm(term: Term): boolean {
    if (term.word !== this._currentTerm.word) {
      return false
    }
    
    this._completedTermCount++
    
    return true
  }
}
