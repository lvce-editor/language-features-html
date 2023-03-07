/**
 * @param {any[]} tokens
 * @param {number} offset
 * @returns {any}
 */
export const getTokenIndexAtOffset = (tokens, offset) => {
  // TODO binary search
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.offset >= offset) {
      if (token.offset === offset) {
        return i
      }
      return i - 1
    }
  }
  return tokens.length - 1
}
