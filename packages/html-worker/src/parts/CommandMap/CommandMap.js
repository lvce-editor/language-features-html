import * as ClosingTag from '../ClosingTag/ClosingTag.js'
import * as Completion from '../Completion/Completions.js'
import * as HtmlWorkerCommandType from '../HtmlWorkerCommandType/HtmlWorkerCommandType.js'
import * as TabCompletion from '../TabCompletion/TabCompletion.js'

const noop = (...args) => {
  return undefined
}

export const getFn = (method) => {
  switch (method) {
    case HtmlWorkerCommandType.GetTabCompletion:
      return TabCompletion.htmlTabCompletion
    case HtmlWorkerCommandType.GetCompletion:
      return Completion.htmlCompletion
    case HtmlWorkerCommandType.GetClosingTag:
      return ClosingTag.getClosingTag
    default:
      return noop
  }
}