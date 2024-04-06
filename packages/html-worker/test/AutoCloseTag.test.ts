import { htmlAutoClose } from '../src/parts/AutoCloseTag/AutoCloseTag.js'
import {test, expect} from '@jest/globals'

test('basic', () => {
  expect(
    htmlAutoClose('<h1><', [
      {
        endOffset: 5,
        inserted: '/',
        deleted: 0,
      },
    ])
  ).toEqual({
    startOffset: 6,
    inserted: 'h1>',
    deleted: 0,
  })
})

test('tag with text', () => {
  expect(
    htmlAutoClose('<h1>hello world<', [
      {
        endOffset: 16,
        inserted: '/',
        deleted: 0,
      },
    ])
  ).toEqual({
    startOffset: 17,
    inserted: 'h1>',
    deleted: 0,
  })
})

test('inside document', () => {
  expect(
    htmlAutoClose(
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <div></
  </body>
</html>
`,
      [
        {
          endOffset: 129,
          inserted: '/',
          deleted: 0,
        },
      ]
    )
  ).toEqual({
    startOffset: 130,
    inserted: 'div>',
    deleted: 0,
  })
})
