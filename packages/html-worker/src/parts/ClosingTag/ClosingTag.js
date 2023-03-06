import * as TokenizeHtml from '../TokenizeHtml/TokenizeHtml.js'
import * as TokenType from '../TokenType/TokenType.js'

const getPreviousOpenTag = (tokens, index) => {
  const stack = []
  for (let i = index; i >= 0; i--) {
    const token = tokens[i]
    if (token.type === TokenType.TagNameEnd) {
      stack.push(token.text)
    }
    if (token.type === TokenType.TagNameStart) {
      if (stack.length === 0) {
        return token.text
      }
      stack.pop()
    }
  }
  return ''
}

export const getClosingTag = (text, offset) => {
  const tokens = TokenizeHtml.tokenizeHtml(text)
  if (tokens.length === 0) {
    return undefined
  }
  const index = TokenizeHtml.getTokenIndexAtOffset(tokens, offset)
  const token = tokens[index]
  switch (token.type) {
    case TokenType.OpeningAngleBracket:
      const previousOpenTag = getPreviousOpenTag(tokens, index)
      if (!previousOpenTag) {
        return undefined
      }
      return {
        inserted: `/${previousOpenTag}>`,
      }
    default:
      return undefined
  }
}
