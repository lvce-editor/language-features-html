import { testWorker } from '../src/testWorker.js'

test.skip('completion', async () => {
  const execMap = {}
  const config = {}
  const quickPick = () => {}
  const worker = await testWorker({
    execMap,
    config,
    quickPick,
  })
  const text = `h1 {
  displ`
  const offset = 12
  expect(
    await worker.execute('Css.getCompletion', text, offset),
  ).toContainEqual({
    kind: 1,
    label: 'display',
    snippet: 'display: ',
  })
})
