import * as CompletionProvider from './parts/ExtensionHostCompletionProviderHtml/ExtensionHostCompletionProviderHtml.js'
import * as TabCompletionProvider from './parts/ExtensionHostTabCompletionHtml/ExtensionHostTabCompletionHtml.js'

export const activate = () => {
  // TODO
  vscode.registerCompletionProvider(CompletionProvider)
  vscode.registerTabCompletionProvider(TabCompletionProvider)
}
