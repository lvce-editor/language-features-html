export const getEmbeddedLanguage = (text, offset) => {
  const tags = /<!--[\s\S]*?(?:-->|$)|<(script|style)\b[^>]*>|<\/(script|style)\s*>/gi
  let currentLanguage
  let match
  while ((match = tags.exec(text))) {
    if (match.index > offset) {
      break
    }
    if (match[0].startsWith('<!--')) {
      if (offset < tags.lastIndex) {
        return undefined
      }
      continue
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
  const { text } = textDocument
  const language = getEmbeddedLanguage(text, offset)
  if (language === 'script') {
    return ['//', '']
  }
  if (language === 'style') {
    return ['/*', '*/']
  }
  return ['<!--', '-->']
}
