import { htmlAutoClose } from '../src/parts/AutoCloseTag/AutoCloseTag.js'

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
