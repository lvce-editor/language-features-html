import * as HtmlWorker from '../HtmlWorker/HtmlWorker.js'

export const htmlCompletion = async (uri, text, offset) => {
  const rpc = await HtmlWorker.getInstance()
  const result = await rpc.invoke('Html.getCompletion', uri, text, offset)
  return result
}
