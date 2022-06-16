import { tokenizeHtml, TokenType } from './TokenizeHtml.js'

const createNode = (tag, parent, children, start, end) => {
  return {
    tag,
    parent,
    children: [],
    start,
    end,
    closed: false,
  }
}

export const parseHtml = (text) => {
  const tokens = tokenizeHtml(text)
  const htmlDocument = createNode('__root__', undefined, [], 0, text.length)
  htmlDocument.closed = true
  let current = htmlDocument
  for (let i = 0; i < tokens.length; i++) {
    switch (tokens[i].type) {
      case TokenType.TagNameStart:
        const startTag = text.slice(tokens[i].offset, tokens[i + 1].offset)
        const child = createNode(startTag, current, [], tokens[i].offset - 1, 0)
        current.children.push(child)
        current = child
        break
      case TokenType.TagNameEnd:
        const endTagOffset = tokens[i].offset
        const endTag = text.slice(tokens[i].offset, tokens[i + 1].offset)
        if (endTag === current.tag) {
          current.closed = true
          current.end = endTagOffset
          current = current.parent
        } else {
          let node = current
          while (node.tag !== endTag && node.parent) {
            node = node.parent
          }
          if (node.parent) {
            while (current !== node) {
              current.end = endTagOffset
              current.closed = false
              current = current.parent
            }
          }
        }
        break
    }
  }
  while (!current.closed) {
    current.closed = false
    current.end = text.length
    current = current.parent
  }
  return htmlDocument
}

export const findNodeAtOffset = (htmlDocument, offset) => {
  for (const child of htmlDocument.children) {
    child.start // ?
    child.end // ?
    if (child.start <= offset && offset <= child.end) {
      return findNodeAtOffset(child, offset)
    }
  }
  return htmlDocument
}

const result = parseHtml('<div></div><div><') // ?.

result.children[0].start // ?
result.children[0].end // ?

findNodeAtOffset(result, 17) // ?

// result.children[0] //?

// htmlDocument.children.push(createNode('h2', htmlDocument))

// htmlDocument.children[0].parent //?
// htmlDocument
// parseHtml(`<> `) //?

// parseHtml(`<h1>hello<a\nworld</h1>`)
// for (let i = 0; i < 10_000; i++) {
//   tokenizeHtml(`<h1>hello world</h1>`) //?.
//   parseHtml(`<h1>hello world</h1>`) //?.
// }
// parseHtml(`<h1 class

// `) //?

// parseHtml(`<h1>hellaaaaaaaaaaaaaaaao>world</h1>`) //?

// parseHtml(`<h1 class=>`) //?
