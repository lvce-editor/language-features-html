import * as TypeScriptLanguageService from '../TypeScriptLanguageService/TypeScriptLanguageService.js'

export const getCompletion = (uri, offset) => {
  const languageService = TypeScriptLanguageService.getLanguageService(uri)
  const completions = languageService.getCompletionsAtPosition(uri)
  console.log({ languageService, completions })
  return []
}
