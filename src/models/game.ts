import type { Content, Term } from "./content";
import { clamp } from "@/assets/tungsten/math";

export enum GameMode {
  Exploration,
  Test
}

export class Test {
  _completedTermCount = 0
  _content: Content
  
  _currentTerm?: Term
  _nextTermIndex = 0
  
  constructor(content: Content) {
    this._content = content
  }
  
  get progress(): number {
    return clamp(this._completedTermCount / this._content.termCount, 0, 1)
  }
  
  produceNextTerm(): Term | undefined {
    const term = this._content.produceNextTerm(0)
    this._currentTerm = term
    return term
  }
  
  makeProgressWithTerm(term: Term): boolean {
    if (term.word !== this._currentTerm?.word) {
      return false
    }
    
    this._completedTermCount++
    return true
  }
}
