import * as Definition from '../Definition/Definition.js'

export const languageId = 'html'

export const provideDefinition = async (textDocument, offset) => {
  const { text } = textDocument
  const result = await Definition.getDefinition(textDocument.uri, text, offset)
  return result
}
