import * as CssTabCompletion from '../CssTabCompletion/CssTabCompletion.js'

export const getTabCompletionContent = (text, offset) => {
  return CssTabCompletion.cssTabCompletion(text, offset)
}
