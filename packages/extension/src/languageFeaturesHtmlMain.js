import * as CompletionProvider from './parts/ExtensionHostCompletionProviderHtml/ExtensionHostCompletionProviderHtml.js'
import * as TabCompletionProvider from './parts/ExtensionHostTabCompletionHtml/ExtensionHostTabCompletionHtml.js'
import * as ClosingTagProvider from './parts/ExtensionHostClosingTagProviderHtml/ExtensionHostClosingTagProviderHtml.js'

export const activate = () => {
  // TODO
  vscode.registerCompletionProvider(CompletionProvider)
  vscode.registerTabCompletionProvider(TabCompletionProvider)
  if (vscode.registerClosingTagProvider) {
    vscode.registerClosingTagProvider(ClosingTagProvider)
  }
}
