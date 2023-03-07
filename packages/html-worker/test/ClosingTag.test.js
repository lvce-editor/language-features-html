import * as ClosingTag from '../src/parts/ClosingTag/ClosingTag.js'

test('getClosingTag', () => {
  const text = `<div><`
  const offset = 6
  expect(ClosingTag.getClosingTag(text, offset)).toEqual({
    inserted: '/div>',
  })
})

test('getClosingTag - no closing tag', () => {
  const text = ``
  const offset = 0
  expect(ClosingTag.getClosingTag(text, offset)).toBeUndefined()
})

test('getClosingTag - nested tag', () => {
  const text = `<div><span></span><`
  const offset = 19
  expect(ClosingTag.getClosingTag(text, offset)).toEqual({
    inserted: '/div>',
  })
})

test('getClosingTag - nested tag with image in between', () => {
  const text = `<div><img><`
  const offset = 11
  expect(ClosingTag.getClosingTag(text, offset)).toEqual({
    inserted: '/div>',
  })
})
