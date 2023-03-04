import * as GetTabCompletionContent from '../GetTabCompletionContent/GetTabCompletionContent.js'
import * as GetTabCompletionDoctype from '../GetTabCompletionDoctype/GetTabCompletionDoctype.js'
import * as GetWordAtOffset from '../GetWordAtOffset/GetWordAtOffset.js'
import { getTokenAtOffset, tokenizeHtml } from '../TokenizeHtml/TokenizeHtml.js'
import * as TokenType from '../TokenType/TokenType.js'

// TODO tab completion should not trigger auto completion from document change again
export const htmlTabCompletion = (uri, text, offset) => {
  // console.time('get word at offset')
  const wordAtOffset = GetWordAtOffset.getWordAtOffset(text, offset)
  // console.timeEnd('get word at offset')
  if (!wordAtOffset) {
    return undefined
  }
  if (wordAtOffset === '!') {
    return GetTabCompletionDoctype.getTabCompletionDoctype()
  }
  // console.time('tokenize')
  const tokens = tokenizeHtml(text)
  // console.timeEnd('tokenize')
  const tokenAtOffset = getTokenAtOffset(tokens, offset)
  if (
    tokenAtOffset.type !== TokenType.Content &&
    tokenAtOffset.type !== TokenType.OpeningAngleBracket
  ) {
    return undefined
  }
  return GetTabCompletionContent.getTabCompletionContent(wordAtOffset)
}
