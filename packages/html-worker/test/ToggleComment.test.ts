import * as ToggleComment from '../src/parts/ToggleComment/ToggleComment.js'
import { test, expect } from '@jest/globals'

const expectComment = (text, offset) => {
  return {
    toBe(expected) {
      expect(ToggleComment.toggleComment(text, offset)).toBe(expected)
    },
  }
}

test('empty', () => {
  expectComment('', 0).toBe('<!--  -->')
})

test('single html element', () => {
  expectComment('<h1>hello world</h1>', 5).toBe('<!-- <h1>hello world</h1> -->')
})
