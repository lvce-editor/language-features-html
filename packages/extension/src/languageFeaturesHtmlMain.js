/* eslint-disable unicorn/no-top-level-side-effects */
import {
  activate as activateExtensionApi,
  registerClosingTagProvider,
  registerCompletionProvider,
  registerDefinitionProvider,
  registerTabCompletionProvider,
} from '@lvce-editor/api'
import * as ClosingTagProvider from './parts/ExtensionHostClosingTagProviderHtml/ExtensionHostClosingTagProviderHtml.js'
import * as CompletionProvider from './parts/ExtensionHostCompletionProviderHtml/ExtensionHostCompletionProviderHtml.js'
import * as DefinitionProvider from './parts/ExtensionHostDefinitionProviderHtml/ExtensionHostDefinitionProviderHtml.js'
import * as TabCompletionProvider from './parts/ExtensionHostTabCompletionHtml/ExtensionHostTabCompletionHtml.js'

let isActivated = false

export const activate = async () => {
  if (isActivated) {
    return
  }
  isActivated = true
  await activateExtensionApi()
  registerCompletionProvider({
    ...CompletionProvider,
    id: 'html.provideCompletions.html',
  })
  registerTabCompletionProvider({
    ...TabCompletionProvider,
    id: 'html.provideTabCompletion.html',
  })
  registerDefinitionProvider({
    ...DefinitionProvider,
    id: 'html.provideDefinition.html',
  })
  registerClosingTagProvider({
    ...ClosingTagProvider,
    id: 'html.provideClosingTag.html',
  })
}

await activate()
