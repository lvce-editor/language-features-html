import { expect, test } from '@jest/globals'
import { testWorker } from '../src/testWorker.js'

test('completion', async () => {
  const execMap = {}
  const config = {}
  const quickPick = () => {}
  const worker = await testWorker({
    execMap,
    config,
    quickPick,
  })
  const uri = ''
  const text = `<`
  const offset = 1
  expect(
    await worker.execute('Html.getCompletion', uri, text, offset),
  ).toContainEqual({ kind: 1, label: 'a', snippet: 'a' })
})
