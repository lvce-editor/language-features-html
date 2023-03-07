import * as IsSelfClosingTag from '../src/parts/IsSelfClosingTag/IsSelfClosingTag.js'

test('isSelfClosingTag - img', () => {
  expect(IsSelfClosingTag.isSelfClosingTag('img')).toBe(true)
})

test('isSelfClosingTag - div', () => {
  expect(IsSelfClosingTag.isSelfClosingTag('div')).toBe(false)
})
