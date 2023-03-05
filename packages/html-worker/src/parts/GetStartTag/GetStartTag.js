import * as TokenType from '../TokenType/TokenType.js'

const getEndOfStartTag = (tokens, index) => {
  const startToken = tokens[index]
  for (let i = index; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type === TokenType.ClosingAngleBracket) {
      return {
        startTag: startToken.text,
        startTagIndex: token.offset + 1,
      }
    }
  }
  return { startTagIndex: 0, startTag: '' }
}

export const getStartTag = (tokens, index) => {
  for (let i = index; i >= 0; i--) {
    const token = tokens[i]
    if (token.type === TokenType.TagNameStart) {
      return getEndOfStartTag(tokens, i)
    }
  }
  return { startTagIndex: 0, startTag: '' }
}
