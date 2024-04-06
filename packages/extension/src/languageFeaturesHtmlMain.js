import * as ClosingTagProvider from './parts/ExtensionHostClosingTagProviderHtml/ExtensionHostClosingTagProviderHtml.js'
import * as CompletionProvider from './parts/ExtensionHostCompletionProviderHtml/ExtensionHostCompletionProviderHtml.js'
import * as TabCompletionProvider from './parts/ExtensionHostTabCompletionHtml/ExtensionHostTabCompletionHtml.js'
import * as DefinitionProvider from './parts/ExtensionHostDefinitionProviderHtml/ExtensionHostDefinitionProviderHtml.js'

export const activate = () => {
  // TODO
  // @ts-ignore
  vscode.registerCompletionProvider(CompletionProvider)
  // @ts-ignore
  vscode.registerTabCompletionProvider(TabCompletionProvider)
  // @ts-ignore
  vscode.registerDefinitionProvider(DefinitionProvider)
  // @ts-ignore
  if (vscode.registerClosingTagProvider) {
    // @ts-ignore
    vscode.registerClosingTagProvider(ClosingTagProvider)
  }
}
