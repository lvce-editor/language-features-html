import { htmlCompletion } from '../src/parts/Completion/Completions.js'
import { test, expect } from '@jest/globals'

test('start tag completions', async () => {
  expect(await htmlCompletion('', '<', 1)).toContainEqual({
    label: 'h1',
    snippet: 'h1',
    kind: 1,
  })
  expect(await htmlCompletion('', '<', 1)).toContainEqual({
    label: 'h2',
    snippet: 'h2',
    kind: 1,
  })
})

test('attribute name completions', async () => {
  const completions = await htmlCompletion('', '<h1 >', 4)
  const completionClass = completions.find((item) => item.label === 'class')
  expect(completionClass).toBeDefined()
  expect(completionClass).toEqual({
    label: 'class',
    snippet: 'class="$1"',
    kind: 2,
  })
  const completionId = completions.find((item) => item.label === 'id')
  expect(completionId).toBeDefined()
  expect(completionId).toEqual({
    label: 'id',
    snippet: 'id="$1"',
    kind: 2,
  })
})

test('input type value completions', async () => {
  const text = '<input type="">'
  const completions = await htmlCompletion('', text, text.indexOf('"') + 1)
  expect(completions.map((item) => item.label)).toContain('number')
  expect(completions.map((item) => item.label)).toContain('text')
  expect(completions.map((item) => item.label)).toContain('url')
})

test('attribute value completions are scoped to the tag and attribute', async () => {
  const complete = async (text) => htmlCompletion('', text, text.indexOf('"') + 1)
  expect(await complete('<input type="tex">')).toContainEqual({
    label: 'text',
    snippet: 'text',
    kind: 1,
  })
  expect(await complete('<div type="">')).toEqual([])
  expect(await complete('<input title="">')).toEqual([])
  expect((await htmlCompletion('', '<input type=tex>', 14)).map((item) => item.label)).toContain('text')
})

test('global enumerated attribute values', async () => {
  const text = '<div dir="">'
  expect((await htmlCompletion('', text, text.indexOf('"') + 1)).map((item) => item.label)).toEqual([
    'ltr',
    'rtl',
    'auto',
  ])
})

test('inside content', async () => {
  expect(await htmlCompletion('', '<h1>hello world</h1>', 4)).toEqual([])
  expect(await htmlCompletion('', '<h1>hello world</h1>', 6)).toEqual([])
})

test('nested completions', async () => {
  expect(await htmlCompletion('', '<a><abbr>  <article><', 21)).toContainEqual({
    label: 'h1',
    snippet: 'h1',
    kind: 1,
  })
})

test('after doctype', async () => {
  expect(await htmlCompletion('', '<!DOCTYPE html>ab<', 18)).toContainEqual({
    label: 'h1',
    snippet: 'h1',
    kind: 1,
  })
})

test('css property name completion', async () => {
  expect(
    await htmlCompletion(
      '',
      `<style>
h1 {

}
`,
      13,
    ),
  ).toContainEqual({
    label: 'color',
    snippet: 'color: ',
    kind: 1,
  })
})
