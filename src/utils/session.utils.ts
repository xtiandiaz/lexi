import { prepareTermToGuess } from "./game.utils"
import useGameStore from '@/stores/game'
import useSessionStore from '@/stores/session'

// export function supplyTermsInSessionIfNeeded() {
//   const game = useGameStore()
//   const settings = game.settings
//   const session = useSessionStore()
  
//   const usableTerms = session.allTerms.filter(t => settings.activeLanguages.includes(t.language))
  
//   const shortage = settings.dailyGoal.termCount - usableTerms.length
//   if (shortage <= 0) {
//     session.terms = usableTerms
//     return
//   }
  
//   const supply = Array.range(0, shortage)
//     .compactMap(() => game.content?.produceNextTerm())
//     .map(t => prepareTermToGuess(t))
  
//   session.terms = usableTerms.concat(supply)
  
//   session.allTerms.push(...supply)
// }
