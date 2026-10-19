import { expect, test } from '@jest/globals'
import { htmlDefinition } from '../src/parts/Definition/Definition.js'

const getDefinition = (text: string, value: string, offset = 0) => {
  const valueOffset = text.indexOf(value)
  return htmlDefinition(
    'file:///workspace/project/index.html',
    text,
    valueOffset + offset,
  )
}

test('goes to a stylesheet link target', () => {
  expect(getDefinition('<link rel="stylesheet" href="index.css">', 'index.css')).toEqual({
    uri: 'file:///workspace/project/index.css',
    startOffset: 0,
    endOffset: 0,
  })
})

test('goes to a script source target', () => {
  expect(getDefinition('<script src="scripts/app.js"></script>', 'scripts/app.js')).toEqual({
    uri: 'file:///workspace/project/scripts/app.js',
    startOffset: 0,
    endOffset: 0,
  })
})

test('preserves the local document URI scheme', () => {
  const text = '<script src="app.js"></script>'
  expect(htmlDefinition('memfs:///workspace/index.html', text, text.indexOf('app.js'))).toMatchObject({
    uri: 'memfs:///workspace/app.js',
  })
})

test('supports single quoted and unquoted references', () => {
  expect(getDefinition("<script src='app.js'></script>", 'app.js')).toMatchObject({
    uri: 'file:///workspace/project/app.js',
  })
  expect(getDefinition('<script src=app.js></script>', 'app.js')).toMatchObject({
    uri: 'file:///workspace/project/app.js',
  })
})

test('does not navigate from unrelated attributes or tags', () => {
  expect(getDefinition('<div href="index.css"></div>', 'index.css')).toBeUndefined()
  expect(getDefinition('<link rel="icon" href="index.css">', 'index.css')).toBeUndefined()
  expect(getDefinition('<script data-src="app.js"></script>', 'app.js')).toBeUndefined()
})

test('does not navigate at the value end boundary', () => {
  expect(getDefinition('<script src="app.js"></script>', 'app.js', 'app.js'.length)).toBeUndefined()
})

test('ignores unsupported and fragment references without throwing', () => {
  expect(getDefinition('<script src="https://example.com/app.js"></script>', 'https://example.com/app.js')).toBeUndefined()
  expect(getDefinition('<script src="#section"></script>', '#section')).toBeUndefined()
  expect(getDefinition('<script src=""></script>', '')).toBeUndefined()
})
