export const labelForKey = (key: string): string => {
  switch (key) {
    case ' ': return '␣'
    default: return key
  }
}
