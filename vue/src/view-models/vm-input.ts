import { InputMarkKind, type InputState } from '@/models/input'
import { InputTool } from '@/models/tools'
import { type KeypadKeyVM, type ToolBarButtonVM } from '@/components/vueties/view-models'
import { canUseInputTool } from '@/services/tool-handler'
import { Icon } from '@/assets/design-tokens/iconography'

export const keypadKeyVMs = (inputState: InputState): KeypadKeyVM[] => {
  const keys: KeypadKeyVM[] = inputState.inputableIndices.map(li => {
    return { 
      label: inputState.source.baseWord[li].toLowerCase(), 
      value: li, 
      isEnabled: !inputState.indices.includes(li) 
    }
  })
  
  keys.push({ 
    label: 'delete', 
    value: -1, 
    isEnabled: inputState.indices.length !== 0,
    icon: Icon.Delete
  })
  
  return keys
}

export const inputToolBarButtonVMs = (inputState: InputState): ToolBarButtonVM<InputTool>[] => {
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
    case InputMarkKind.Hints:
      return Icon.Hint
    case InputMarkKind.Tests:
      return Icon.Right
  }
}
