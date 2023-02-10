// TODO would be nice to have typescript for all extensions
// but is it worth the compile time?
import * as Completion from '../Completion/Completion.js'

export const languageId = 'html'

export const provideCompletions = async (textDocument, offset) => {
  console.log('PROVIDER HTML COMPLETION')
  const text = vscode.getTextFromTextDocument(textDocument)
  const completions = await Completion.htmlCompletion('', text, offset)
  console.log({ completions })
  return completions
}

export const triggerCharacters = []
