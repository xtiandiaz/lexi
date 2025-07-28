import { InputMarkKind, type InputState } from '@/models/input'
import { InputTool } from '@/models/tools'
import useGameStore from '@/stores/game'
import { canUseInputTool } from '@/services/tool-handler'
import { labelForKey } from '@/utils/input.utils'
import { Icon } from '@/assets/design-tokens/iconography'
import type { VuetyKeypadKeyVM } from '@vueties/components/pads/view-models'
import type { VuetyToolbarButtonVM } from '@vueties/components/bars/view-models'

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

export const inputToolBarButtonVMs = (inputState: InputState): VuetyToolbarButtonVM<InputTool>[] => {
  if (useGameStore().test) {
    return []
  }
  
  return [
    {
      tool: InputTool.Hint,
      icon: Icon.Hint,
      isEnabled: canUseInputTool(InputTool.Hint, inputState)
    }
  ]
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
