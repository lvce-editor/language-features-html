import { htmlCompletion } from '../src/parts/Completion/Completions.js'

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
      13
    )
  ).toContainEqual({
    label: 'color',
    snippet: 'color: ',
    kind: 1,
  })
})
