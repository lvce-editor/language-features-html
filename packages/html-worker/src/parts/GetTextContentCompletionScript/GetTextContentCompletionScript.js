import * as JavaScriptCompletion from '../JavaScriptCompletion/JavaScriptCompletion.js'

export const getTextContentCompletionScript = (uri, offset) => {
  return JavaScriptCompletion.getCompletion(uri, offset)
}
