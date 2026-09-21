import { expect, test } from '@jest/globals'
import { execute } from '../src/parts/ExtensionHost/ExtensionHostCommandWrapTag.js'

const wrap = async (text: string, start: number, end: number) => {
  const result = await execute(text, [start, 0, end, 0])
  return {
    selections: result.selections,
    text: result.text,
  }
}

test('wraps plain selected text', async () => {
  await expect(wrap('hello world', 6, 11)).resolves.toEqual({
    selections: [
      { end: 11, start: 6 },
      { end: 22, start: 16 },
    ],
    text: 'hello <div>world</div>',
  })
})

test('expands a selection touching a complete element', async () => {
  const text = '<button>hello world</button>'
  await expect(wrap(text, 1, text.length - 1)).resolves.toMatchObject({
    text: '<div><button>hello world</button></div>',
  })
})

test('expands the innermost nested element', async () => {
  const text = '<div><span>hello</span></div>'
  const start = text.indexOf('<span>') + 1
  await expect(wrap(text, start, start + 4)).resolves.toMatchObject({
    text: '<div><div><span>hello</span></div></div>',
  })
})

test('matches repeated tag names using nesting order', async () => {
  const text = '<div>a<div>b</div>c</div>'
  const start = text.indexOf('<div>', 1) + 1
  await expect(wrap(text, start, start + 1)).resolves.toMatchObject({
    text: '<div>a<div><div>b</div></div>c</div>',
  })
})

test('handles reversed selections', async () => {
  await expect(wrap('hello world', 11, 6)).resolves.toMatchObject({
    text: 'hello <div>world</div>',
  })
})

test('handles multiline content and attributes containing angle brackets', async () => {
  const text = '<section data-value=">"><span>one\ntwo</span></section>'
  const start = text.indexOf('<span>') + 1
  await expect(wrap(text, start, start + 3)).resolves.toMatchObject({
    text: '<section data-value=">"><div><span>one\ntwo</span></div></section>',
  })
})

test('does not treat void elements as matching pairs', async () => {
  const text = '<img src="a"><p>hello</p>'
  await expect(wrap(text, 0, text.indexOf('</p>') + 4)).resolves.toMatchObject({
    text: '<div><img src="a"><p>hello</p></div>',
  })
})

test('wraps malformed html without throwing', async () => {
  const text = '<div><span>hello'
  const start = text.indexOf('hello')
  await expect(wrap(text, start, start + 5)).resolves.toMatchObject({
    text: '<div><span><div>hello</div>',
  })
})
