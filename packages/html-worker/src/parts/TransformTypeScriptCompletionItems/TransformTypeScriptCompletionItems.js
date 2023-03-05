export const transformTypeScriptCompletionItems = (tsResult) => {
  if (!tsResult) {
    return []
  }
  const { entries } = tsResult
  const completions = []
  for (const entry of entries) {
    completions.push({
      label: entry.name,
      kind: 1,
      snippet: `${entry.name}`,
    })
  }
  console.log({ tsResult })
  return completions
}
