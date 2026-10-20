// TODO would be nice to have typescript for all extensions
// but is it worth the compile time?
import * as Completion from '../Completion/Completion.js'
import { readDirWithFileTypes } from '@lvce-editor/api'

const getStylesheetCompletions = async (uri, context) => {
  try {
    const documentDirectory = new URL('.', uri)
    const directoryUri = new URL(context.directoryPath, documentDirectory).href
    const entries = await readDirWithFileTypes(directoryUri)
    return entries
      .filter((entry) => entry.type === 7 && entry.name.toLowerCase().endsWith('.css'))
      .filter((entry) => entry.name.toLowerCase().startsWith(context.filePrefix.toLowerCase()))
      .map((entry) => ({
        label: `${context.pathPrefix}${entry.name}`,
        snippet: entry.name,
        kind: 1,
      }))
  } catch {
    return []
  }
}

export const languageId = 'html'

export const provideCompletions = async (textDocument, offset) => {
  const { text, uri } = textDocument
  const pathContext = await Completion.getStylesheetPathCompletionContext(text, offset)
  if (pathContext) {
    return getStylesheetCompletions(uri, pathContext)
  }
  const completions = await Completion.htmlCompletion(uri, text, offset)
  return completions
}

export const triggerCharacters = []
