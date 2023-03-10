const State = {
  Default: 1,
}

const RE_HTML_TAG_NAME = /[!:\w$]((?![>/])\S)*$/

let offset = 0
let state = State.Default
let text = ''
const stack = []

const goBackUntil = (char) => {
  while (offset > 0 && text[offset - 1] !== char) {
    offset--
  }
}

const peekLeft = () => {
  return text[offset - 1]
}

const getTagName = () => {
  const match = text.slice(0, offset).match(RE_HTML_TAG_NAME)
  if (!match) {
    return undefined
  }
  return match[0]
}

const goBack = (count) => {
  offset -= count
}

export const getPreviousOpenTag = (initialText, initialOffset) => {
  offset = initialOffset
  state = State.Default
  text = initialText
  goBackUntil('>')
  goBack(1)
  const tagName = getTagName()
  if (!tagName) {
    return undefined
  }
  offset -= tagName.length
  return {
    tagName,
    offset,
  }
}

// getPreviousOpenTag('<h1></h1>', 8) //?

getPreviousOpenTag('<h1></', 6) // ?
