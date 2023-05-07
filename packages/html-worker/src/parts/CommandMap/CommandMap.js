import * as ClosingTag from '../ClosingTag/ClosingTag.js'
import * as Completion from '../Completion/Completions.js'
import * as Definition from '../Definition/Definition.js'
import * as HtmlWorkerCommandType from '../HtmlWorkerCommandType/HtmlWorkerCommandType.js'
import * as TabCompletion from '../TabCompletion/TabCompletion.js'

export const commandMap = {
  [HtmlWorkerCommandType.GetTabCompletion]: TabCompletion.htmlTabCompletion,
  [HtmlWorkerCommandType.GetCompletion]: Completion.htmlCompletion,
  [HtmlWorkerCommandType.GetClosingTag]: ClosingTag.getClosingTag,
  [HtmlWorkerCommandType.GetDefinition]: Definition.htmlDefinition,
}
