import * as HtmlWorker from '../HtmlWorker/HtmlWorker.js'
import * as HtmlWorkerCommandType from '../HtmlWorkerCommandType/HtmlWorkerCommandType.js'

export const getDefinition = async (text, offset) => {
  const rpc = await HtmlWorker.getInstance()
  const result = await rpc.invoke(
    HtmlWorkerCommandType.GetDefinition,
    text,
    offset
  )
  return result
}
