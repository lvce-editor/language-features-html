import * as TypeScriptLanguageServiceFactory from '../TypeScriptLanguageServiceFactory/TypeScriptLanguageServiceFactory.js'

export const state = {
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
