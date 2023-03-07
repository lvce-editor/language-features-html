import * as IsSelfClosingTag from '../IsSelfClosingTag/IsSelfClosingTag.js'
import * as TokenType from '../TokenType/TokenType.js'

export const getPreviousOpenTag = (tokens, index) => {
  const stack = []
  for (let i = index; i >= 0; i--) {
    const token = tokens[i]
    if (token.type === TokenType.TagNameEnd) {
      stack.push(token.text)
    }
    if (
      token.type === TokenType.TagNameStart &&
      !IsSelfClosingTag.isSelfClosingTag(token.text)
    ) {
      if (stack.length === 0) {
        return token.text
      }

      stack.pop()
    }
  }
  return ''
}
