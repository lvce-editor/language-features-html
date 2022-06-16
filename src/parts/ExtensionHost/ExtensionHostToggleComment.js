// TODO would be nice to have typescript for all extensions
// but is it worth the compile time?
import * as TabCompletion from '../TabCompletion/TabCompletion.js'

export const languageId = 'html'

export const toggleComment = (textDocument, offset) => {
  const text = vscode.getTextFromTextDocument(textDocument)
  const tabCompletion = TabCompletion.htmlTabCompletion(text, offset)
  return tabCompletion
}
