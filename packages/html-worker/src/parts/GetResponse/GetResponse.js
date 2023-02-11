import * as Completion from '../Completion/Completions.js'
import * as HtmlWorkerCommandType from '../HtmlWorkerCommandType/HtmlWorkerCommandType.js'
import * as TabCompletion from '../TabCompletion/TabCompletion.js'

export const getResponse = async (method, params) => {
  if (method === HtmlWorkerCommandType.GetTabCompletion) {
    const uri = params[0]
    const content = params[1]
    const offset = params[2]
    const result = await TabCompletion.htmlTabCompletion(content, offset)
    return result
  }
  if (method === HtmlWorkerCommandType.GetCompletion) {
    const uri = params[0]
    const content = params[1]
    const offset = params[2]
    const result = Completion.htmlCompletion(content, offset)
    return result
  }
  return undefined
}
