import {
  expect,
  getTmpDir,
  runWithExtension,
  test,
} from '@lvce-editor/test-with-playwright'
import { writeFile } from 'fs/promises'
import { join } from 'node:path'

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
  const editor = page.locator('.Editor')
  await expect(editor).toHaveText('!')

  await page.keyboard.press('Tab')

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
