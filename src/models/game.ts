import type { Term } from "./content";
import { clamp } from "@/assets/tungsten/math";

export enum GameMode {
  Exploration,
  Test
}

export class Test {
  _completedTermCount = 0
  _terms: Term[]
  
  _currentIndex = 0
  
  constructor(terms: Term[]) {
    this._terms = terms.shuffled()
  }
  
  get currentTerm(): Term {
    return this._terms[this._currentIndex]
  }
  
  get progress(): number {
    return clamp(this._completedTermCount / this._terms.length, 0, 1)
  }
  
  produceNextTerm(): Term | undefined {
    if (this._currentIndex >= (this._terms.length - 1)) {
      return undefined
    }
    
    this._currentIndex += 1
    
    return this.currentTerm
  }
  
  makeProgressWithTerm(term: Term): boolean {
    if (term.word !== this.currentTerm.word) {
      return false
    }
    
    this._completedTermCount++
    
    return true
  }
}
