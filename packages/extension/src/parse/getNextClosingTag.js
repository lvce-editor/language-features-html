// const State = {
//   Default: 1,
// }

// const RE_HTML_TAG_NAME = /^[!:\w\$]((?![>\/])[\S])*/

// let offset = 0
// let state = State.Default
// let text = ''
// let stack = []

// const advanceUntil = (char) => {
//   while (offset < text.length && text[offset] !== char) {
//     offset++
//   }
// }

// const peek = () => {
//   return text[offset]
// }

// const getTagName = () => {
//   const match = text.slice(offset).match(RE_HTML_TAG_NAME)
//   if (!match) {
//     return undefined
//   }
//   return match[0]
// }

// const advance = (count) => {
//   offset += count
// }

// export const getNextClosingTagName = (initialText, initialOffset) => {
//   offset = initialOffset
//   state = State.Default
//   text = initialText

//   advanceUntil('<')
//   advance(1)
//   if (peek() === '/') {
//     advance(1)
//     const tagName = getTagName()
//     console.log({ tagName })
//     console.log('is peek')
//   } else {
//     console.log(text.slice(offset))
//     const tagName = getTagName()
//     console.log({ tagName })
//   }
//   console.log({ offset })

//   return 22
// }

// getNextClosingTagName('<h1></h1>', 3) //?
