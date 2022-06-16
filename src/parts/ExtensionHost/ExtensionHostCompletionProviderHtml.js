// TODO would be nice to have typescript for all extensions
// but is it worth the compile time?
import * as Completion from '../Completion/Completions.js'

export const languageId = 'html'

export const provideCompletions = (textDocument, offset) => {
  console.log('PROVIDER HTML COMPLETION')
  const text = vscode.getTextFromTextDocument(textDocument)
  const completions = Completion.htmlCompletion(text, offset)
  console.log({ completions })
  return completions
}

export const triggerCharacters = []
