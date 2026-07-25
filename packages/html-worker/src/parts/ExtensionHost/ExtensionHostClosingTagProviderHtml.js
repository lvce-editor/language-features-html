import * as AutoCloseTag from '../AutoCloseTag/AutoCloseTag.js'

const getClosingTagFromHtmlResult = (htmlResult) => {
  return {
    inserted: '',
    deleted: 0,
    offset: htmlResult.startOffset,
  }
}
export const provideClosingTag = (textDocument, offset) => {
  const { text } = textDocument
  const htmlResult = AutoCloseTag.htmlAutoClose(text, offset)
  const result = getClosingTagFromHtmlResult(htmlResult)
  return result
}
