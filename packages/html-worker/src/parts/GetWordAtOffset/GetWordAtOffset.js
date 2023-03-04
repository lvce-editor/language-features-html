const special = new Set([' ', '\n', '\t', '<', '>', '/'])

export const getWordAtOffset = (text, offset) => {
  for (let index = offset - 1; index >= 0; index--) {
    if (special.has(text[index])) {
      return text.slice(index + 1, offset)
    }
  }
  return text.slice(0, offset)
}
