export const getDefinitionFromTsResult = (tsResult) => {
  if (tsResult.length === 0) {
    return undefined
  }
  const first = tsResult[0]
  return {
    uri: first.fileName,
    startOffset: 0,
    endOffset: 0,
  }
}
