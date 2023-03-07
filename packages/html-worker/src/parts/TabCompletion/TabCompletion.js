import * as GetTabCompletionContent from '../GetTabCompletionContent/GetTabCompletionContent.js'
import * as GetTabCompletionDoctype from '../GetTabCompletionDoctype/GetTabCompletionDoctype.js'
import * as GetTabCompletionLoremIpsum from '../GetTabCompletionLoremIpsum/GetTabCompletionLoremIpsum.js'
import * as GetWordAtOffset from '../GetWordAtOffset/GetWordAtOffset.js'
import { tokenizeHtml } from '../TokenizeHtml/TokenizeHtml.js'
import * as GetTokenIndexAtOffset from '../GetTokenIndexAtOffset/GetTokenIndexAtOffset.js'
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
    return GetTabCompletionDoctype.getTabCompletion()
  }
  if (wordAtOffset.startsWith('lorem')) {
    return GetTabCompletionLoremIpsum.getTabCompletion(wordAtOffset)
  }
  // console.time('tokenize')
  const tokens = tokenizeHtml(text)
  // console.timeEnd('tokenize')
  const index = GetTokenIndexAtOffset.getTokenIndexAtOffset(tokens, offset)
  const tokenAtOffset = tokens[index]
  switch (tokenAtOffset.type) {
    case TokenType.Content:
      return GetTabCompletionContent.getTabCompletion(
        text,
        tokens,
        index,
        offset,
        wordAtOffset
      )
    default:
      return undefined
  }
}
