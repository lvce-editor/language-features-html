import * as ClosingTag from '../src/parts/ClosingTag/ClosingTag.js'

test('getClosingTag', () => {
  const text = `<div><`
  const offset = 6
  expect(ClosingTag.getClosingTag(text, offset)).toEqual({
    inserted: '/div>',
  })
})
