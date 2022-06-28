import { mkdtemp, writeFile } from 'fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'os'
import {
  runWithExtension,
  test,
  expect,
} from '@lvce-editor/test-with-playwright'

const getTmpDir = () => {
  return mkdtemp(join(tmpdir(), 'css-completion'))
}

test('html.completion', async () => {
  const tmpDir = await getTmpDir()
  await writeFile(join(tmpDir, 'test.html'), '<')
  const page = await runWithExtension({
    folder: tmpDir,
  })
  const testHtml = page.locator('text=test.html')
  await testHtml.click()
  const tokenText = page.locator('.Token.Text')
  await tokenText.click()
  await page.keyboard.press('End')
  await page.keyboard.press('Control+Space')

  const completions = page.locator('#Completions')
  await expect(completions).toBeVisible()

  const completionItems = completions.locator('.EditorCompletionItem')
  const completionItemOne = completionItems.nth(0)
  await expect(completionItemOne).toHaveText('a')
})
