import * as HtmlWorker from '../HtmlWorker/HtmlWorker.js'
import * as HtmlWorkerCommandType from '../HtmlWorkerCommandType/HtmlWorkerCommandType.js'

export const htmlCompletion = async (uri, text, offset) => {
  const rpc = await HtmlWorker.getInstance()
  const result = await rpc.invoke(
    HtmlWorkerCommandType.GetCompletion,
    uri,
    text,
    offset
  )
  return result
}
