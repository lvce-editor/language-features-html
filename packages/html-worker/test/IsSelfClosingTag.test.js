import * as IsSelfClosingTag from '../src/parts/IsSelfClosingTag/IsSelfClosingTag.js'
import { test, expect } from '@jest/globals'

test('isSelfClosingTag - img', () => {
  expect(IsSelfClosingTag.isSelfClosingTag('img')).toBe(true)
})

test('isSelfClosingTag - div', () => {
  expect(IsSelfClosingTag.isSelfClosingTag('div')).toBe(false)
})

test('isSelfClosingTag - link', () => {
  expect(IsSelfClosingTag.isSelfClosingTag('link')).toBe(true)
})
