import * as GetPreviousOpenTag from '../GetPreviousOpenTag/GetPreviousOpenTag.js'
import * as GetTokenIndexAtOffset from '../GetTokenIndexAtOffset/GetTokenIndexAtOffset.js'
import * as TokenizeHtml from '../TokenizeHtml/TokenizeHtml.js'
import * as TokenType from '../TokenType/TokenType.js'

export const getClosingTag = (text, offset) => {
  const tokens = TokenizeHtml.tokenizeHtml(text)
  if (tokens.length === 0) {
    return undefined
  }
  if (text[offset - 1] !== '<') {
    return undefined
  }
  const index = GetTokenIndexAtOffset.getTokenIndexAtOffset(tokens, offset)
  const token = tokens[index]
  switch (token.type) {
    case TokenType.OpeningAngleBracket:
    case TokenType.ClosingTagSlash:
    case TokenType.WhitespaceAfterOpeningTagOpenAngleBracket:
    case TokenType.Content:
      const previousOpenTag = GetPreviousOpenTag.getPreviousOpenTag(
        tokens,
        index,
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
