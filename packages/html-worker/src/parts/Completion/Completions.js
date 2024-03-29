import * as GetAttributeNameCompletions from '../GetAttributeNameCompletions/GetAttributeNameCompletions.js'
import * as GetClosingTagCompletions from '../GetClosingTagCompletions/GetClosingTagCompletions.js'
import * as GetHtmlTagCompletions from '../GetHtmlTagCompletions/GetHtmlTagCompletions.js'
import * as GetTextContentCompletion from '../GetTextContentCompletion/GetTextContentCompletion.js'
import { tokenizeHtml } from '../TokenizeHtml/TokenizeHtml.js'
import * as GetTokenIndexAtOffset from '../GetTokenIndexAtOffset/GetTokenIndexAtOffset.js'
import * as TokenType from '../TokenType/TokenType.js'
import * as Assert from '../Assert/Assert.js'

const NO_COMPLETIONS = []

// TODO completions should have property offset?

/**
 *
 * @param {string} text
 * @param {number} offset
 */
export const htmlCompletion = (uri, text, offset) => {
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
      case TokenType.OpeningAngleBracket:
      case TokenType.TagNameStart:
      case TokenType.WhitespaceAfterOpeningTagOpenAngleBracket:
        return GetHtmlTagCompletions.getHtmlTagCompletions()
      case TokenType.WhitespaceInsideOpeningTag:
      case TokenType.AttributeName:
      case TokenType.ClosingAngleBracket:
        return GetAttributeNameCompletions.getAttributeNameCompletions()
      case TokenType.WhitespaceAfterClosingTagSlash:
      case TokenType.ClosingTagSlash:
        return GetClosingTagCompletions.getClosingTagCompletions()
      case TokenType.Content:
        return GetTextContentCompletion.getTextContentCompletion(
          uri,
          text,
          tokens,
          index,
          offset,
        )
      default:
    }
  } catch (error) {
    console.error(error)
  }
  return NO_COMPLETIONS
}

// htmlAutoCompletion('<h1></', {
//   offset: 6,
//   text: '/',
// })
// htmlCompletion(`<h1 `, 4) //?

// htmlCompletion(`<`, 1) //?

// htmlCompletion(
//   `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Docuament</title>
//     <address></address>
// <audio>
//   </head>
//   <body>
//     sample test
//     <
//   </body>
// </html>

// `,
//   309
// ) //?
