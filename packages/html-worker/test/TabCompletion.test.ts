import { htmlTabCompletion } from '../src/parts/TabCompletion/TabCompletion.js'
import {test, expect} from '@jest/globals'

test('default', async () => {
  expect(await htmlTabCompletion('', 'h1', 2)).toEqual({
    inserted: '<h1>$0</h1>',
    deleted: 2,
    type: /* Snippet */ 2,
  })
})

test.skip('inside tag', async () => {
  expect(await htmlTabCompletion('', '<button>button</button>', 14)).toEqual({
    inserted: '<button$0></button>',
    deleted: 6,
    type: /* Snippet */ 2,
  })
})

test.skip('after opening angle bracket', async () => {
  expect(await htmlTabCompletion('', '<', 1)).toEqual(undefined)
})

test('after opening tag name', async () => {
  expect(await htmlTabCompletion('', '<h1', 3)).toEqual(undefined)
})

test('after closing tag name', async () => {
  expect(await htmlTabCompletion('', '<h1></h1', 8)).toEqual(undefined)
})

test('after attribute name', async () => {
  expect(await htmlTabCompletion('', '<h1 class', 9)).toEqual(undefined)
})

test('snippet - doctype', async () => {
  expect(await htmlTabCompletion('', '!', 1)).toEqual({
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

test('snippet - form', async () => {
  expect(await htmlTabCompletion('', 'form', 4)).toEqual({
    inserted: `<form action="">\n\n$0\n</form>`,
    deleted: 4,
    type: /* Snippet */ 2,
  })
})

test('at end of tag', async () => {
  expect(await htmlTabCompletion('', '<h1></h1> more text', 9)).toEqual(
    undefined
  )
})

test('inside style', async () => {
  expect(
    await htmlTabCompletion(
      '',
      `<style>
h1 {
  d
}`,
      16
    )
  ).toEqual({
    inserted: `display: `,
    deleted: 1,
    offset: 8,
    type: /* Snippet */ 2,
  })
})

test('style tag', async () => {
  expect(
    await htmlTabCompletion(
      ``,
      `<h1></h1>
style`,
      15
    )
  ).toEqual({
    inserted: '<style>$0</style>',
    deleted: 5,
    type: /* Snippet */ 2,
  })
})

test('after style tag', async () => {
  expect(
    await htmlTabCompletion(
      ``,
      `<style></style>
h1`,
      18
    )
  ).toEqual({
    inserted: '<h1>$0</h1>',
    deleted: 2,
    type: /* Snippet */ 2,
  })
})

test('div with id', async () => {
  expect(await htmlTabCompletion('', '#results', 8)).toEqual({
    deleted: 8,
    inserted: '<div id="results"></div>',
    type: 2,
  })
})
