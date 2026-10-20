export const getEmbeddedLanguage = (text, offset) => {
  const tags = /<(script|style)\b[^>]*>|<\/(script|style)\s*>/gi
  let currentLanguage
  let match
  while ((match = tags.exec(text))) {
    if (match.index > offset) {
      break
    }
    if (match[1] && offset >= tags.lastIndex) {
      currentLanguage = match[1].toLowerCase()
    } else if (match[2]) {
      currentLanguage = undefined
    }
  }
  return currentLanguage
}

export const languageId = 'html'

export const provideComment = (textDocument, offset) => {
  // @ts-ignore
  const text = vscode.getTextFromTextDocument(textDocument)
  const language = getEmbeddedLanguage(text, offset)
  if (language === 'script') {
    return ['//', '']
  }
  if (language === 'style') {
    return ['/*', '*/']
  }
  return ['<!--', '-->']
}
