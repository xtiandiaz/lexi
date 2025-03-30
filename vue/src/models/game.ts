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
  
  nextTerm(): Term | undefined {
    if (this._nextTermIndex >= this._content.termCount) {
      return undefined
    }
    this._currentTerm = this._content.produceTerm(this._nextTermIndex, 0)
    this._nextTermIndex++
    
    return this._currentTerm
  }
  
  makeProgressWithTerm(term: Term): boolean {
    if (term.baseWord !== this._currentTerm?.baseWord) {
      return false
    }
    
    this._completedTermCount++
    return true
  }
}
