import * as Completion from '../Completion/Completions.js'
import * as HtmlWorkerCommandType from '../HtmlWorkerCommandType/HtmlWorkerCommandType.js'
import * as TabCompletion from '../TabCompletion/TabCompletion.js'

const noop = (...args) => {
  return undefined
}

const getFn = (method) => {
  switch (method) {
    case HtmlWorkerCommandType.GetTabCompletion:
      return TabCompletion.htmlTabCompletion
    case HtmlWorkerCommandType.GetCompletion:
      return Completion.htmlCompletion
    default:
      return noop
  }
}

export const execute = async (method, ...params) => {
  const fn = getFn(method)
  // @ts-ignore
  const result = await fn(...params)
  return result
}
