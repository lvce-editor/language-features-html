import * as Assert from '../Assert/Assert.js'
import * as GetTextContentDefinition from '../GetTextContentDefinition/GetTextContentDefinition.js'
import * as GetTokenIndexAtOffset from '../GetTokenIndexAtOffset/GetTokenIndexAtOffset.js'
import * as TokenType from '../TokenType/TokenType.js'
import { tokenizeHtml } from '../TokenizeHtml/TokenizeHtml.js'

const NO_DEFINITION = undefined

// TODO completions should have property offset?

/**
 *
 * @param {string} text
 * @param {number} offset
 */
export const htmlDefinition = (uri, text, offset) => {
  try {
    Assert.string(uri)
    Assert.string(text)
    Assert.number(offset)
    const tokens = tokenizeHtml(text)
    const index = GetTokenIndexAtOffset.getTokenIndexAtOffset(tokens, offset)
    const tokenAtOffset = tokens[index]
    switch (tokenAtOffset.type) {
      case TokenType.Content:
        return GetTextContentDefinition.getTextContentDefinition(
          uri,
          text,
          tokens,
          index,
          offset
        )
      default:
    }
  } catch (error) {
    console.error(error)
  }
  return NO_DEFINITION
}
