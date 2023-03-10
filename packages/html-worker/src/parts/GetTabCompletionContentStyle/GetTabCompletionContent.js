import * as CssTabCompletion from '../CssTabCompletion/CssTabCompletion.js'

export const getTabCompletion = (text, offset) => {
  return CssTabCompletion.cssTabCompletion(text, offset)
}
