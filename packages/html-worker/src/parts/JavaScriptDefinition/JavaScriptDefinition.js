import * as TypeScriptLanguageService from '../TypeScriptLanguageService/TypeScriptLanguageService.js'
import * as GetDefinitionFromTsResult from '../GetDefinitionFromTsResult/GetDefinitionFromTsResult.js'

export const getDefinition = async (uri, text, offset) => {
  const { languageService, host } =
    await TypeScriptLanguageService.getLanguageService()
  host.uri = uri
  host.content = text
  const tsResult = languageService.getDefinitionAtPosition(uri, offset)
  const definition =
    GetDefinitionFromTsResult.getDefinitionFromTsResult(tsResult)
  return definition
}
