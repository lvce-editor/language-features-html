import { expect, test } from '@jest/globals'
import { testWorker } from '../src/testWorker.js'

test('auto-closing-tag', async () => {
  const execMap = {}
  const config = {}
  const quickPick = () => {}
  const worker = await testWorker({
    execMap,
    config,
    quickPick,
  })
  const text = `<div><`
  const offset = 6
  expect(await worker.execute('Html.getClosingTag', text, offset)).toEqual({
    inserted: '/div>',
  })
})
