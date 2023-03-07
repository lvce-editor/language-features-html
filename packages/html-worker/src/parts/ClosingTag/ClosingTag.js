import * as TokenizeHtml from '../TokenizeHtml/TokenizeHtml.js'
import * as TokenType from '../TokenType/TokenType.js'
import * as IsSelfClosingTag from '../IsSelfClosingTag/IsSelfClosingTag.js'
import * as GetPreviousOpenTag from '../GetPreviousOpenTag/GetPreviousOpenTag.js'

export const getClosingTag = (text, offset) => {
  const tokens = TokenizeHtml.tokenizeHtml(text)
  if (tokens.length === 0) {
    return undefined
  }
  const index = TokenizeHtml.getTokenIndexAtOffset(tokens, offset)
  const token = tokens[index]
  switch (token.type) {
    case TokenType.OpeningAngleBracket:
    case TokenType.ClosingTagSlash:
    case TokenType.WhitespaceAfterOpeningTagOpenAngleBracket:
      const previousOpenTag = GetPreviousOpenTag.getPreviousOpenTag(
        tokens,
        index
      )
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
