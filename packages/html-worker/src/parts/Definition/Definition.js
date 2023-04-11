import * as GetAttributeNameCompletions from '../GetAttributeNameCompletions/GetAttributeNameCompletions.js'
import * as GetClosingTagCompletions from '../GetClosingTagCompletions/GetClosingTagCompletions.js'
import * as GetHtmlTagCompletions from '../GetHtmlTagCompletions/GetHtmlTagCompletions.js'
import * as GetTextContentCompletion from '../GetTextContentCompletion/GetTextContentCompletion.js'
import { tokenizeHtml } from '../TokenizeHtml/TokenizeHtml.js'
import * as GetTokenIndexAtOffset from '../GetTokenIndexAtOffset/GetTokenIndexAtOffset.js'
import * as TokenType from '../TokenType/TokenType.js'
import * as Assert from '../Assert/Assert.js'

const NO_DEFINITION = undefined

// TODO completions should have property offset?

/**
 *
 * @param {string} text
 * @param {number} offset
 */
export const htmlDefinition = (uri, text, offset) => {
  // TODO try catch is slow
  // is it necessary here or in extension host service?
  try {
    Assert.string(uri)
    Assert.string(text)
    Assert.number(offset)
    const tokens = tokenizeHtml(text)
    const index = GetTokenIndexAtOffset.getTokenIndexAtOffset(tokens, offset)
    const tokenAtOffset = tokens[index]
    switch (tokenAtOffset.type) {
      case TokenType.Content:
        return GetTextContentCompletion.getTextContentCompletion(
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
