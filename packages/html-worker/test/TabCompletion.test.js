import { htmlTabCompletion } from '../src/parts/TabCompletion/TabCompletion.js'

test('default', () => {
  expect(htmlTabCompletion('', 'h1', 2)).toEqual({
    inserted: '<h1>$0</h1>',
    deleted: 2,
    type: /* Snippet */ 2,
  })
})

test.skip('inside tag', () => {
  expect(htmlTabCompletion('', '<button>button</button>', 14)).toEqual({
    inserted: '<button$0></button>',
    deleted: 6,
    type: /* Snippet */ 2,
  })
})

test.skip('after opening angle bracket', () => {
  expect(htmlTabCompletion('', '<', 1)).toEqual(undefined)
})

test('after opening tag name', () => {
  expect(htmlTabCompletion('', '<h1', 3)).toEqual(undefined)
})

test('after closing tag name', () => {
  expect(htmlTabCompletion('', '<h1></h1', 8)).toEqual(undefined)
})

test('after attribute name', () => {
  expect(htmlTabCompletion('', '<h1 class', 9)).toEqual(undefined)
})

test('snippet - doctype', () => {
  expect(htmlTabCompletion('', '!', 1)).toEqual({
    inserted: `<!DOCTYPE html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\" />
    <title>Document</title>
  </head>
  <body>

  </body>
</html>
`,
    deleted: 1,
    type: /* Snippet */ 2,
  })
})

test('snippet - form', () => {
  expect(htmlTabCompletion('', 'form', 4)).toEqual({
    inserted: `<form action="">\n\n$0\n</form>`,
    deleted: 4,
    type: /* Snippet */ 2,
  })
})

test('at end of tag', () => {
  expect(htmlTabCompletion('', '<h1></h1> more text', 9)).toEqual(undefined)
})
