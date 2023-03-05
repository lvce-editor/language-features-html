import * as TypeScriptLanguageService from '../TypeScriptLanguageService/TypeScriptLanguageService.js'
import * as TransformTypeScriptCompletionItems from '../TransformTypeScriptCompletionItems/TransformTypeScriptCompletionItems.js'

export const getCompletion = (uri, text, offset) => {
  const { languageService, host } =
    TypeScriptLanguageService.getLanguageService()
  host.uri = uri
  host.content = text
  const tsResult = languageService.getCompletionsAtPosition(uri, offset)
  const completions =
    TransformTypeScriptCompletionItems.transformTypeScriptCompletionItems(
      tsResult
    )
  console.log({ languageService })
  return completions
}
