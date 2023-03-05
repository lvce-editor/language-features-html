import * as TokenType from '../TokenType/TokenType.js'

export const getEndTag = (tokens, index) => {
  for (let i = index; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type === TokenType.TagNameEnd) {
      return { endTagIndex: token.offset - 2, endTag: token.text }
    }
  }
  const lastToken = tokens[tokens.length - 1]
  return { endTagIndex: lastToken.offset, endTag: '' }
}
