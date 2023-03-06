// TODO would be nice to have typescript for all extensions
// but is it worth the compile time?
import * as ClosingTag from '../ClosingTag/ClosingTag.js'

export const languageId = 'html'

export const provideClosingTag = async (textDocument, offset) => {
  const text = vscode.getTextFromTextDocument(textDocument)
  const result = await ClosingTag.provideClosingTag(text, offset)
  return result
}

export const triggerCharacters = []
