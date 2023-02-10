import * as HtmlWorker from '../HtmlWorker/HtmlWorker.js'

export const getTabCompletion = async (uri, text, offset) => {
  const rpc = await HtmlWorker.getInstance()
  const start = performance.now()
  const result = await rpc.invoke('Html.getTabCompletion', uri, text, offset)
  const end = performance.now()
  console.log('tab completion took', end - start, 'ms')
  return result
}
