import * as Definition from '../Definition/Definition.js'

export const languageId = 'html'

export const provideDefinition = async (textDocument, offset) => {
  const text = vscode.getTextFromTextDocument(textDocument)
  const result = await Definition.getDefinition(text, offset)
  return result
}
