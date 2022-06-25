import {
  tokenizeHtml,
  getTokenAtOffset,
  TokenType,
} from '../../parse/TokenizeHtml.js'

export const autoInsertQuotes = (text, edits) => {
  if (edits.length > 1) {
    console.warn('cannot handle multiple edits at the moment')
    return
  }
  const edit = edits[0]
  const tokens = tokenizeHtml(text)
  const token = getTokenAtOffset(tokens, edit.offset)
  if (token.type === TokenType.AttributeEqualSign) {
    return {
      offset: token.offset + 1,
      inserted: '""',
      deleted: 0,
    }
  }
  return undefined
}
