export function getHintedChunk(input: string, inputableHunk: string): string | undefined {
  let letterMatchCount = 0
  for (let i = 0; i < input.length; i++) {
    if (input[i] === inputableHunk[i])
      letterMatchCount++
  }
  
  if (letterMatchCount < (inputableHunk.length - 1)) {
    return inputableHunk.substring(0, letterMatchCount + (letterMatchCount === input.length ? 1 : 0))
  }
  
  return undefined
}

export function canHint(input: string, inputableHunk: string): boolean {
  return getHintedChunk(input, inputableHunk) !== undefined
}
