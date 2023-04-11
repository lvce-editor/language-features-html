import * as HtmlWorker from '../HtmlWorker/HtmlWorker.js'
import * as HtmlWorkerCommandType from '../HtmlWorkerCommandType/HtmlWorkerCommandType.js'

export const getDefinition = async (uri, text, offset) => {
  const rpc = await HtmlWorker.getInstance()
  const result = await rpc.invoke(
    HtmlWorkerCommandType.GetDefinition,
    uri,
    text,
    offset
  )
  return result
}
