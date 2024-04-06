import * as AutoCloseTag from '../AutoCloseTag/AutoCloseTag.js'

const getClosingTagFromHtmlResult = (htmlResult) => {
  return {
    inserted: '',
    deleted: 0,
    offset: htmlResult.startOffset,
  }
}
/**
 // @ts-ignore
 * @type{vscode.ClosingTagProvider['provideClosingTag']}
 */
export const provideClosingTag = (textDocument, offset) => {
  // @ts-ignore
  const text = vscode.getTextFromTextDocument(textDocument)
  const htmlResult = AutoCloseTag.htmlAutoClose(text, offset)
  const result = getClosingTagFromHtmlResult(htmlResult)
  return result
}
