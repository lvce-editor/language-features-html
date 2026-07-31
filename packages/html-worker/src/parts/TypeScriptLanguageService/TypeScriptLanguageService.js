import * as TypeScriptLanguageServiceFactory from '../TypeScriptLanguageServiceFactory/TypeScriptLanguageServiceFactory.js'

const state = {
  /**
   * @type {Promise<any>|undefined}
   */
  promise: undefined,
}

export const getLanguageService = () => {
  if (!state.promise) {
    state.promise = TypeScriptLanguageServiceFactory.getLanguageService()
  }
  return state.promise
}
