import { InputMarkKind, type InputState } from '@/models/input'
import { labelForKey } from '@/utils/input.utils'
import { Icon } from '@/assets/design-tokens/iconography'
import type { VuetyKeypadKeyVM } from '@vueties/components/pads/view-models'

export const keypadKeyVMs = (inputState: InputState): VuetyKeypadKeyVM[] => {
  const keys: VuetyKeypadKeyVM[] = inputState.inputableIndices.map(li => {
    return { 
      isDimmed: /[ ]/.test(inputState.term.word[li]),
      isEnabled: !inputState.indices.includes(li),
      label: labelForKey(inputState.term.word[li].toLowerCase()),
      value: li, 
    }
  })
  
  keys.push({ 
    isDimmed: false,
    isEnabled: inputState.indices.length !== 0,
    label: 'delete', 
    value: -1, 
    icon: Icon.Delete,
  })
  
  return keys
}

export const inputMarkIcon = (kind: InputMarkKind) => {
  switch (kind) {
    case InputMarkKind.Hint:
      return Icon.Hint
    case InputMarkKind.Test:
      return Icon.CheckmarkCircle
  }
}

export const showsInputMarkValueForKind = (kind: InputMarkKind) => {
  switch (kind) {
    case InputMarkKind.Test:
      return false
    case InputMarkKind.Hint:
      return true
  }
}
