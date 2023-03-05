import { htmlCompletion } from '../src/parts/Completion/Completions.js'

test('start tag completions', () => {
  expect(htmlCompletion('', '<', 1)).toContainEqual({
    label: 'h1',
    snippet: 'h1',
    kind: 1,
  })
  expect(htmlCompletion('', '<', 1)).toContainEqual({
    label: 'h2',
    snippet: 'h2',
    kind: 1,
  })
})

test('attribute name completions', () => {
  expect(htmlCompletion('', '<h1 >', 4)).toEqual([
    {
      label: 'class',
      snippet: 'class="$1"',
      kind: 2,
    },
    {
      label: 'id',
      snippet: 'id="$1"',
      kind: 2,
    },
    {
      label: 'tabindex',
      snippet: 'tabindex="$1"',
      kind: 2,
    },
  ])
})

test('inside content', () => {
  expect(htmlCompletion('', '<h1>hello world</h1>', 4)).toEqual([])
  expect(htmlCompletion('', '<h1>hello world</h1>', 6)).toEqual([])
})

test('nested completions', () => {
  expect(htmlCompletion('', '<a><abbr>  <article><', 21)).toContainEqual({
    label: 'h1',
    snippet: 'h1',
    kind: 1,
  })
})

test('after doctype', () => {
  expect(htmlCompletion('', '<!DOCTYPE html>ab<', 18)).toContainEqual({
    label: 'h1',
    snippet: 'h1',
    kind: 1,
  })
})

test('css property name completion', () => {
  expect(
    htmlCompletion(
      '',
      `<style>
h1 {

}
`,
      13
    )
  ).toContainEqual({
    label: 'color',
    snippet: 'color: ',
    kind: 1,
  })
})
