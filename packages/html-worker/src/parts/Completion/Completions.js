import { getTokenAtOffset, tokenizeHtml } from '../TokenizeHtml/TokenizeHtml.js'
import * as TokenType from '../TokenType/TokenType.js'
import * as ImportJson from '../ImportJson/ImportJson.js'

const htmlTags = await ImportJson.importJson('data/html-tags.json')

const toHtmlTagCompletion = (htmlTag) => {
  {
    return { ...htmlTag, kind: /* Property */ 1 }
  }
}

const HTML_TAG_COMPLETIONS = htmlTags.map(toHtmlTagCompletion)

const NO_COMPLETIONS = []

const ATTRIBUTE_NAME_COMPLETIONS = [
  {
    label: 'class',
    snippet: 'class="$1"',
    kind: /* Value */ 2,
  },
  {
    label: 'id',
    snippet: 'id="$1"',
    kind: /* Value */ 2,
  },
  {
    label: 'tabindex',
    snippet: 'tabindex="$1"',
    kind: /* Value */ 2,
  },
]

// TODO completions should have property offset?

const CLOSING_TAG_COMPLETIONS = [
  {
    label: 'h1',
    snippet: 'h1',
  },
  {
    label: 'h2',
    snippet: 'h2',
  },
  {
    label: 'h3',
    snippet: 'h3',
  },
]

/**
 *
 * @param {string} text
 * @param {number} offset
 */
export const htmlCompletion = (uri, text, offset) => {
  // TODO try catch is slow
  // is it necessary here or in extension host service?
  try {
    const tokens = tokenizeHtml(text)
    const tokenAtOffset = getTokenAtOffset(tokens, offset)
    switch (tokenAtOffset.type) {
      case TokenType.OpeningAngleBracket:
      case TokenType.TagNameStart:
      case TokenType.WhitespaceAfterOpeningTagOpenAngleBracket:
        return HTML_TAG_COMPLETIONS
      case TokenType.WhitespaceInsideOpeningTag:
      case TokenType.AttributeName:
      case TokenType.ClosingAngleBracket:
        return ATTRIBUTE_NAME_COMPLETIONS
      case TokenType.WhitespaceAfterClosingTagSlash:
      case TokenType.ClosingTagSlash:
        return CLOSING_TAG_COMPLETIONS
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
