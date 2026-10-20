import * as TokenType from '../TokenType/TokenType.js'

const getAttributeValue = (tokens, tagStart, name) => {
  for (let i = tagStart + 1; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type === TokenType.ClosingAngleBracket) {
      break
    }
    if (token.type !== TokenType.AttributeName || token.text.toLowerCase() !== name) {
      continue
    }
    if (tokens[i + 1]?.type !== TokenType.AttributeEqualSign) {
      continue
    }
    const valueToken = tokens[i + 2]
    if (valueToken?.type === TokenType.AttributeQuoteStart) {
      return tokens[i + 3]?.type === TokenType.AttributeValue ? tokens[i + 3].text : ''
    }
    if (valueToken?.type === TokenType.AttributeValue) return valueToken.text
  }
  return ''
}

/**
 * @param {any[]} tokens
 * @param {number} index
 * @param {number} offset
 */
export const getStylesheetPathCompletionContext = (tokens, index, offset) => {
  const token = tokens[index]
  if (
    token?.type !== TokenType.AttributeQuoteStart &&
    token?.type !== TokenType.AttributeValue &&
    token?.type !== TokenType.AttributeQuoteEnd
  ) {
    return undefined
  }
  let tagStart = -1
  for (let i = index; i >= 0; i--) {
    if (tokens[i].type === TokenType.OpeningAngleBracket) {
      tagStart = i
      break
    }
    if (tokens[i].type === TokenType.ClosingAngleBracket) {
      return undefined
    }
  }
  if (tagStart < 0 || tokens[tagStart + 1]?.text.toLowerCase() !== 'link') {
    return undefined
  }
  if (getAttributeValue(tokens, tagStart, 'rel').toLowerCase() !== 'stylesheet') {
    return undefined
  }
  const hrefIndex = tokens.findIndex(
    (item, i) => i > tagStart && item.type === TokenType.AttributeName && item.text.toLowerCase() === 'href',
  )
  if (hrefIndex < 0 || index < hrefIndex + 2) {
    return undefined
  }
  const quoteToken = tokens[hrefIndex + 2]
  const isQuoted = quoteToken?.type === TokenType.AttributeQuoteStart
  const valueToken = isQuoted ? tokens[hrefIndex + 3] : quoteToken
  if (!isQuoted && valueToken?.type !== TokenType.AttributeValue) {
    return undefined
  }
  const isEmpty = isQuoted && valueToken?.type !== TokenType.AttributeValue
  const valueStart = isEmpty ? quoteToken.offset + 1 : valueToken.offset
  const value = isEmpty ? '' : valueToken.text
  const cursorOffset = Math.max(0, Math.min(offset - valueStart, value.length))
  const typedPath = value.slice(0, cursorOffset)
  if (!typedPath || typedPath.startsWith('/') || /^[a-z][a-z\d+.-]*:/i.test(typedPath)) {
    // Empty relative paths are valid; only absolute and scheme URLs are excluded.
    if (typedPath) {
      return undefined
    }
  }
  const separatorIndex = typedPath.lastIndexOf('/')
  return {
    directoryPath: separatorIndex < 0 ? '.' : typedPath.slice(0, separatorIndex) || '.',
    pathPrefix: separatorIndex < 0 ? '' : typedPath.slice(0, separatorIndex + 1),
    filePrefix: separatorIndex < 0 ? typedPath : typedPath.slice(separatorIndex + 1),
  }
}
