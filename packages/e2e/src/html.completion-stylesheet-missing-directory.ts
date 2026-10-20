import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'html.completion-stylesheet-missing-directory'

export const test: Test = async ({ Editor, FileSystem, Locator, Main, expect }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const text = '<link rel="stylesheet" href="missing/">'
  await FileSystem.writeFile(`${tmpDir}/index.html`, text)
  await Main.openUri(`${tmpDir}/index.html`)
  await Editor.setCursor(0, text.indexOf('">'))
  await Editor.openCompletion()

  const items = Locator('#Completions').locator('.EditorCompletionItem')
  await expect(items).toHaveCount(0)
}
