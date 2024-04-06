import * as Root from '../src/parts/Root/Root.js'
import { test, expect } from '@jest/globals'

test('root', () => {
  expect(typeof Root.root).toBe('string')
})
