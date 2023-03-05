import * as JavaScriptCompletion from '../JavaScriptCompletion/JavaScriptCompletion.js'

export const getTextContentCompletionScript = (uri, text, offset) => {
  return JavaScriptCompletion.getCompletion(uri, text, offset)
}
