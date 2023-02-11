import * as HtmlWorker from '../HtmlWorker/HtmlWorker.js'
import * as HtmlWorkerCommandType from '../HtmlWorkerCommandType/HtmlWorkerCommandType.js'

export const getTabCompletion = async (uri, text, offset) => {
  const rpc = await HtmlWorker.getInstance()
  const result = await rpc.invoke(
    HtmlWorkerCommandType.GetTabCompletion,
    uri,
    text,
    offset
  )
  return result
}
