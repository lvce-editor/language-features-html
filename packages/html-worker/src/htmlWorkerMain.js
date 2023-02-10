import * as Completion from './parts/Completion/Completions.js'
import * as IpcChild from './parts/IpcChild/IpcChild.js'
import * as IpcChildType from './parts/IpcChildType/IpcChildType.js'
import * as TabCompletion from './parts/TabCompletion/TabCompletion.js'

const getResponse = async (method, params) => {
  if (method === 'Html.getTabCompletion') {
    const uri = params[0]
    const content = params[1]
    const offset = params[2]
    const result = await TabCompletion.htmlTabCompletion(content, offset)
    return result
  }
  if (method === 'Html.getCompletion') {
    const uri = params[0]
    const content = params[1]
    const offset = params[2]
    const result = Completion.htmlCompletion(content, offset)
    return result
  }
  return undefined
}

const handleMessage = async (event) => {
  const message = event.data
  const { method, params, id } = message
  const result = await getResponse(method, params)
  event.target.postMessage({
    jsonrpc: '2.0',
    id: id,
    result: result,
  })
}

const main = async () => {
  const ipc = await IpcChild.listen({
    method: IpcChildType.Auto(),
  })
  ipc.onmessage = handleMessage
}

main()
