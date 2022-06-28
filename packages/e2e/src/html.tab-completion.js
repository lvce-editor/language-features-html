import {
  expect,
  runWithExtension,
  test,
} from '@lvce-editor/test-with-playwright'
import { mkdtemp, writeFile } from 'fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'os'

const getTmpDir = () => {
  return mkdtemp(join(tmpdir(), 'css-completion'))
}

const trimLines = (string) => {
  return string.split('\n').join('')
}

test('html.tab-completion', async () => {
  const tmpDir = await getTmpDir()
  await writeFile(join(tmpDir, 'test.html'), '')
  const page = await runWithExtension({
    folder: tmpDir,
  })
  const testHtml = page.locator('text=test.html')
  await testHtml.click()

  const editorRow = page.locator('.EditorRow')
  await editorRow.click({
    position: {
      x: 0,
      y: 0,
    },
  })

  const editorCursor = page.locator('.EditorCursor')
  await expect(editorCursor).toHaveCount(1)
  await expect(editorCursor).toHaveCSS('top', '0px')
  await expect(editorCursor).toHaveCSS('left', '0px')

  await page.keyboard.press('!')
  await page.keyboard.press('Tab')

  const editor = page.locator('.Editor')
  await expect(editor).toHaveText(
    trimLines(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>

  </body>
</html>`)
  )
})
