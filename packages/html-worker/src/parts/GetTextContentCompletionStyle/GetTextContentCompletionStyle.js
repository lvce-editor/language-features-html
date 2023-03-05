import * as CssCompletion from '../CssCompletion/CssCompletion.js'

export const getTextContentCompletionStyle = (text, offset) => {
  return CssCompletion.cssCompletion(text, offset)
}
