import * as CssCompletion from '../CssCompletion/CssCompletion.js'

export const getCompletion = (uri, text, offset) => {
  return CssCompletion.cssCompletion(text, offset)
}
