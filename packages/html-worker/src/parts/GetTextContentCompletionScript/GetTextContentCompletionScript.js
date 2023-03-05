import * as JavaScriptCompletion from '../JavaScriptCompletion/JavaScriptCompletion.js'

export const getCompletion = (uri, text, offset) => {
  return JavaScriptCompletion.getCompletion(uri, text, offset)
}
