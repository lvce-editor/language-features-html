// TODO would be nice to have typescript for all extensions
// but is it worth the compile time?
import * as AutoCloseTag from './parts/AutoCloseTag/AutoCloseTag.js'
import * as AutoInsertQuotes from './parts/AutoInsertQuotes/AutoInsertQuotes.js'
import * as ExtensionHostCommandWrapTag from './parts/ExtensionHost/ExtensionHostCommandWrapTag.js'
import * as ExtensionHostCompletionProviderHtml from './parts/ExtensionHost/ExtensionHostCompletionProviderHtml.js'
import * as ExtensionHostTabCompletionProviderHtml from './parts/ExtensionHost/ExtensionHostTabCompletionProviderHtml.js'

const autoCloseTag = (textDocument, edits) => {
  const text = vscode.getTextFromTextDocument(textDocument)
  const outGoingEdit = AutoCloseTag.htmlAutoClose(text, edits)
  console.log({ outGoingEdit })
  if (!outGoingEdit) {
    return
  }
  // TODO have TextDocument.applyEdit instead (better api)
  // TODO should return boolean if insertion was successful or not
  vscode.applyEdit(textDocument, {
    offset: outGoingEdit.startOffset,
    inserted: outGoingEdit.inserted,
    deleted: outGoingEdit.deleted,
  })
}

const autoInsertQuotes = (textDocument, edits) => {
  const text = vscode.getTextFromTextDocument(textDocument)
  const outGoingEdit = AutoInsertQuotes.autoInsertQuotes(text, edits)
  if (!outGoingEdit) {
    return
  }
  vscode.applyEdit(textDocument, {
    offset: outGoingEdit.offset,
    deleted: outGoingEdit.deleted,
    inserted: outGoingEdit.inserted,
  })
}

// TODO implement auto class id

const isHtmlDocument = (textDocument) => {
  return textDocument.languageId === 'html'
}

/**
 * @type {vscode.TextDocumentChangeListener}
 */
const onDidChangeTextDocument = (textDocument, changes) => {
  if (!isHtmlDocument(textDocument)) {
    return
  }
  if (changes.length === 1) {
    const edit = changes[0]
    if (!edit) {
      return
    }
    const inserted = edit.inserted
    switch (inserted) {
      // case '1':
      //   vscode.applyEdit(textDocument, { offset: 0, inserted: '0', deleted: 0 })
      //   break
      case '/':
        autoCloseTag(textDocument, changes)
        break
      case '=':
        autoInsertQuotes(textDocument, changes)
        break
      default:
        break
    }
  }

  // TODO when text is '/' do auto close tag
}

export const activate = () => {
  console.log('activate html extension')
  vscode.registerCompletionProvider(ExtensionHostCompletionProviderHtml)
  vscode.registerTabCompletionProvider(ExtensionHostTabCompletionProviderHtml)
  vscode.registerCommand(ExtensionHostCommandWrapTag)
  // vscode.onDidChangeTextDocument(onDidChangeTextDocument)
}
