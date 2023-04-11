import * as JavaScriptDefinition from '../JavaScriptDefinition/JavaScriptDefinition.js'

export const getDefinition = (uri, text, offset) => {
  return JavaScriptDefinition.getDefinition(uri, text, offset)
}
