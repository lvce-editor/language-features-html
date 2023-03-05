import * as TokenType from '../CssTokenType/CssTokenType.js'
import { getMatchingCompletion } from '../getMatchingCompletion.js'
import * as GetTokenAtOffset from '../GetTokenAtOffset/GetTokenAtOffset.js'
import { tokenizeCss } from '../TokenizeCss/TokenizeCss.js'

const RE_WORD = /[a-zA-Z\d\-]+$/

/**
 * @param {string} text
 * @param {number} offset
 */
export const cssTabCompletion = (text, offset) => {
  // console.time('tokenize')
  const tokens = tokenizeCss(text)
  // console.timeEnd('tokenize')
  // console.time('getTokenAtOffset')
  const tokenAtOffset = GetTokenAtOffset.getTokenAtOffset(tokens, offset)
  // console.timeEnd('getTokenAtOffset')
  if (tokenAtOffset.type !== TokenType.PropertyName) {
    return undefined
  }
  // console.time('wordMatch')
  const wordMatch = text.slice(0, offset).match(RE_WORD)
  if (!wordMatch) {
    return undefined
  }
  // console.timeEnd('wordMatch')
  const word = wordMatch[0]
  // console.time('getMatchingCompletion')
  const matchingCompletion = getMatchingCompletion(word)
  // console.timeEnd('getMatchingCompletion')
  if (!matchingCompletion) {
    return undefined
  }
  const edit = {
    offset: offset - word.length,
    inserted: matchingCompletion,
    deleted: word.length,
    type: /* Snippet */ 2,
  }
  return edit
}
