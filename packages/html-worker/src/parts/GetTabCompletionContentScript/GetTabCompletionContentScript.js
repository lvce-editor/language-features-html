import * as JavaScriptTabCompletion from '../JavaScriptTabCompletion/JavaScriptTabCompletion.js'

export const getTabCompletion = (text, offset) => {
  return JavaScriptTabCompletion.getTabCompletion('', text, offset)
}
