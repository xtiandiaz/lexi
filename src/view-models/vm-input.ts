import { InputMarkKind, type InputState } from '@/models/input'
import { InputTool } from '@/models/tools'
import sessionStore from '@/stores/session'
import { canUseInputTool } from '@/services/tool-handler'
import { Icon } from '@/assets/design-tokens/iconography'
import { type KeypadKeyVM, type ToolBarButtonVM } from '@vueties/view-models'

const labelForKey = (key: string): string => {
  switch (key) {
    case ' ': return '＿'
    default: return key
  }
}

export const keypadKeyVMs = (inputState: InputState): KeypadKeyVM[] => {
  const keys: KeypadKeyVM[] = inputState.inputableIndices.map(li => {
    return { 
      label: labelForKey(inputState.source.term.word[li].toLowerCase()),
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
  const session = sessionStore()
  if (session.test) {
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
      return Icon.Right
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
