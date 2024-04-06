// TODO would be nice to have typescript for all extensions
// but is it worth the compile time?
import * as TabCompletion from '../TabCompletion/TabCompletion.js'

export const languageId = 'html'

// TODO handle multiple offsets (multiple cursors)
export const provideTabCompletion = (textDocument, offset) => {
  // TODO editor vs textDocument
  // e.g. codemirror has  editor.getValue()
  // would be simpler if there is only editor and not textDocument
  // e.g. editor.languageId, editor.getText(), editor.applyEdit
  // instead of vscode.activeEditor.textDocument.getText()
  // vscode.activeEditor.getText() -> a bit simpler api
  // but mixing separation of concerns?

  // possibly use textEditor which implements textDocument interface

  // @ts-ignore
  const text = vscode.getTextFromTextDocument(textDocument)
  // vscode.TextDocument.applyEdit(textDocument, edit)
  // const text = textDocument.getText()
  const tabCompletion = TabCompletion.htmlTabCompletion(text, offset)
  return tabCompletion
}
