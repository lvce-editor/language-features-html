import * as ClosingTagProvider from './parts/ExtensionHostClosingTagProviderHtml/ExtensionHostClosingTagProviderHtml.js'
import * as CompletionProvider from './parts/ExtensionHostCompletionProviderHtml/ExtensionHostCompletionProviderHtml.js'
import * as TabCompletionProvider from './parts/ExtensionHostTabCompletionHtml/ExtensionHostTabCompletionHtml.js'
import * as DefinitionProvider from './parts/ExtensionHostDefinitionProviderHtml/ExtensionHostDefinitionProviderHtml.js'

export const activate = () => {
  // TODO
  vscode.registerCompletionProvider(CompletionProvider)
  vscode.registerTabCompletionProvider(TabCompletionProvider)
  vscode.registerDefinitionProvider(DefinitionProvider)
  if (vscode.registerClosingTagProvider) {
    vscode.registerClosingTagProvider(ClosingTagProvider)
  }
}
