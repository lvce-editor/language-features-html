import * as TokenType from '../TokenType/TokenType.js'

export const getStartTag = (tokens, index) => {
  for (let i = index; i >= 0; i--) {
    const token = tokens[i]
    if (token.type === TokenType.TagNameStart) {
      return token.text
    }
  }
  return ''
}
