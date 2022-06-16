const HTML_COMMENT_START = '<!--'
const HTML_COMMENT_END = '-->'
const SPACE = ' '

/**
 *
 * @param {string} text
 * @param {number} offset
 * @returns
 */
export const toggleComment = (text, offset) => {
  let start = offset
  let end = offset
  while (start > 0 && text[start] !== '\n') {
    start--
  }
  while (end < text.length && text[end] !== '\n') {
    end++
  }
  const textStart = text.slice(0, start)
  const middleText = text.slice(start, end)
  const textEnd = text.slice(end)
  const newText =
    textStart +
    HTML_COMMENT_START +
    SPACE +
    middleText +
    SPACE +
    HTML_COMMENT_END +
    textEnd
  return newText
}
