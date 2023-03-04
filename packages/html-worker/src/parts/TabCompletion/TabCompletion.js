import { getTokenAtOffset, tokenizeHtml } from '../TokenizeHtml/TokenizeHtml.js'
import * as TokenType from '../TokenType/TokenType.js'

const RE_WORD = /[a-zA-Z\d]+$/

const SELF_CLOSING_TAGS = new Set(['input', 'br', 'hr', 'link', 'meta'])

const snippets = {
  input: '<input type="$0">$1',
  hr: '<hr>$0',
  br: '<br>$0',
  meta: '<meta>$0',
  div: '<div>\n\t$0\n</div>',
  h1: '<h1>$0</h1>',
  form: '<form action="">\n\n$0\n</form>',
  img: '<img src="" alt="">',
  a: '<a href="">$0</a>',
  script: '<script type="module" src="$0"></script>',
}

const SNIPPET_DOCTYPE = {
  inserted: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>

  </body>
</html>
`,
  deleted: 1,
  type: /* Snippet */ 2,
}

const special = new Set([' ', '\n', '\t', '<', '>', '/'])

const getWordAtOffset = (text, offset) => {
  for (let index = offset - 1; index >= 0; index--) {
    if (special.has(text[index])) {
      return text.slice(index + 1, offset)
    }
  }
  return text.slice(0, offset)
}

// TODO tab completion should not trigger auto completion from document change again
export const htmlTabCompletion = (uri, text, offset) => {
  // console.time('get word at offset')
  const wordAtOffset = getWordAtOffset(text, offset)
  console.log({ wordAtOffset })
  // console.timeEnd('get word at offset')
  if (!wordAtOffset) {
    return undefined
  }
  if (wordAtOffset === '!') {
    return SNIPPET_DOCTYPE
  }
  // console.time('tokenize')
  const tokens = tokenizeHtml(text)
  // console.timeEnd('tokenize')
  const tokenAtOffset = getTokenAtOffset(tokens, offset)
  if (
    tokenAtOffset.type !== TokenType.Content &&
    tokenAtOffset.type !== TokenType.OpeningAngleBracket
  ) {
    return undefined
  }
  if (snippets.hasOwnProperty(wordAtOffset)) {
    return {
      inserted: snippets[wordAtOffset],
      deleted: wordAtOffset.length,
      type: /* Snippet */ 2,
    }
  }
  return {
    inserted: `<${wordAtOffset}>$0</${wordAtOffset}>`,
    deleted: wordAtOffset.length,
    type: /* Snippet */ 2,
  }
}
