import * as TypeScriptLanguageService from '../TypeScriptLanguageService/TypeScriptLanguageService.js'

export const getDefinition = async (uri, text, offset) => {
  const { languageService, host } =
    await TypeScriptLanguageService.getLanguageService()
  host.uri = uri
  host.content = text
  throw new Error('not implemented')
}
