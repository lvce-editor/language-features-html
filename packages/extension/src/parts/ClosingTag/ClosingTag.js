import * as HtmlWorker from '../HtmlWorker/HtmlWorker.js'
import * as HtmlWorkerCommandType from '../HtmlWorkerCommandType/HtmlWorkerCommandType.js'

export const provideClosingTag = async (text, offset) => {
  const rpc = await HtmlWorker.getInstance()
  const result = await rpc.invoke(
    HtmlWorkerCommandType.GetClosingTag,
    text,
    offset
  )
  return result
}
