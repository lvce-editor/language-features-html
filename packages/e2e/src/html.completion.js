import {
  expect,
  runWithExtension,
  test,
} from '@lvce-editor/test-with-playwright'
import { mkdtemp, writeFile } from 'fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const getTmpDir = () => {
  return mkdtemp(join(tmpdir(), 'html-completion'))
}

test('html.completion', async () => {
  const tmpDir = await getTmpDir()
  await writeFile(join(tmpDir, 'test.html'), '<')
  const page = await runWithExtension({
    folder: tmpDir,
  })
  const testHtml = page.locator('text=test.html')
  await testHtml.click()
  const tokenText = page.locator('.Token').first()
  await tokenText.click()

  const cursor = page.locator('.EditorCursor')
  await expect(cursor).toHaveCount(1)
  await expect(cursor).toHaveCSS('top', '0px')
  await expect(cursor).toHaveCSS('left', '0px')

  await page.keyboard.press('End')
  await expect(cursor).toHaveCSS('left', '9px')
  await page.keyboard.press('Control+Space')

  const completions = page.locator('#Completions')
  await expect(completions).toBeVisible()

  const completionItems = completions.locator('.EditorCompletionItem')
  const completionItemOne = completionItems.nth(0)
  await expect(completionItemOne).toHaveText('a')
})
