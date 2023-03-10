import * as TypeScriptLanguageService from '../TypeScriptLanguageService/TypeScriptLanguageService.js'
import * as TransformTypeScriptTabCompletionResult from '../TransformTypeScriptTabCompletionResult/TransformTypeScriptTabCompletionResult.js'

const RE_WORD = /[a-zA-Z\d\-]+$/

export const getTabCompletion = async (uri, text, offset) => {
  const wordMatch = text.slice(0, offset).match(RE_WORD)
  if (!wordMatch) {
    return undefined
  }
  const word = wordMatch[0]
  const { languageService, host } =
    await TypeScriptLanguageService.getLanguageService()
  host.uri = uri
  host.content = text
  const tsResult = languageService.getCompletionsAtPosition(uri, offset)
  const tabCompletion =
    TransformTypeScriptTabCompletionResult.transformTypeScriptTabCompletionResult(
      tsResult,
      offset,
      word
    )
  return tabCompletion
}
