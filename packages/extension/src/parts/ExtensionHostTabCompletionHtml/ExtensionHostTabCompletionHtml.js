// TODO would be nice to have typescript for all extensions
// but is it worth the compile time?
import * as TabCompletion from '../TabCompletion/TabCompletion.js'

export const languageId = 'html'

// TODO handle multiple offsets (multiple cursors)
export const provideTabCompletion = async (textDocument, offset) => {
  const { text } = textDocument
  const tabCompletion = await TabCompletion.getTabCompletion('', text, offset)
  return tabCompletion
}
