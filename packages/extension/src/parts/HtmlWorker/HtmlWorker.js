import * as HtmlWorkerUrl from '../HtmlWorkerUrl/HtmlWorkerUrl.js'

export const state = {
  ipc: undefined,
  /**
   * @type {any}
   */
  rpcPromise: undefined,
}

const createRpc = async () => {
  const workerUrl = HtmlWorkerUrl.getHtmlWorkerUrl()
  // @ts-ignore
  const rpc = await vscode.createRpc({ url: workerUrl, name: 'Html Worker' })
  return rpc
}

const getOrCreateRpc = async () => {
  if (!state.rpcPromise) {
    state.rpcPromise = createRpc()
  }
  return state.rpcPromise
}

export const getInstance = async () => {
  const rpc = await getOrCreateRpc()
  return rpc
}
