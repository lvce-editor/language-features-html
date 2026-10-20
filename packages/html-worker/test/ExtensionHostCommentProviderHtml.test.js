import { expect, test } from '@jest/globals'
import * as CommentProvider from '../../extension/src/parts/ExtensionHostCommentProviderHtml/ExtensionHostCommentProviderHtml.js'

test('detects JavaScript inside a module script', () => {
  const text = '<script type="module">\nconst value = 1\n</script>'
  expect(CommentProvider.getEmbeddedLanguage(text, text.indexOf('const'))).toBe('script')
})

test('detects CSS inside style content', () => {
  const text = '<style>\nbody { color: red }\n</style>'
  expect(CommentProvider.getEmbeddedLanguage(text, text.indexOf('body'))).toBe('style')
})

test('returns to HTML at the closing tag', () => {
  const text = '<script>const value = 1</script>'
  expect(CommentProvider.getEmbeddedLanguage(text, text.indexOf('</script>'))).toBe(undefined)
})

test('uses HTML comments in ordinary markup', () => {
  expect(CommentProvider.getEmbeddedLanguage('<div>content</div>', 5)).toBe(undefined)
})

test('provides JavaScript line comments and HTML block fallback', () => {
  globalThis.vscode = { getTextFromTextDocument: ({ text }) => text }
  const text = '<script type="module">const value = 1</script>'
  const textDocument = { text }
  expect(CommentProvider.provideComment(textDocument, text.indexOf('const'))).toEqual(['//', ''])
  expect(CommentProvider.provideComment(textDocument, 0)).toEqual(['<!--', '-->'])
  delete globalThis.vscode
})

test('provides CSS block comments in style content', () => {
  globalThis.vscode = { getTextFromTextDocument: ({ text }) => text }
  const text = '<style>body { color: red }</style>'
  expect(CommentProvider.provideComment({ text }, text.indexOf('body'))).toEqual(['/*', '*/'])
  delete globalThis.vscode
})
