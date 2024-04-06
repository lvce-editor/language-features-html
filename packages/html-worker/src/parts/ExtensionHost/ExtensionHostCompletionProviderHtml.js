// TODO would be nice to have typescript for all extensions
// but is it worth the compile time?
import * as Completion from '../Completion/Completions.js'

export const languageId = 'html'

export const provideCompletions = (textDocument, offset) => {
  console.log('PROVIDER HTML COMPLETION')
  // @ts-ignore
  const text = vscode.getTextFromTextDocument(textDocument)
  // @ts-ignore
  const completions = Completion.htmlCompletion(text, offset)
  console.log({ completions })
  return completions
}

export const triggerCharacters = []
