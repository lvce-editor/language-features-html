import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'html.completion-body-context'

export const test: Test = async ({
  Editor,
  EditorCompletion,
  FileSystem,
  Locator,
  Main,
  expect,
}) => {
  const tmpDir = await FileSystem.getTmpDir()
  const text = '<!DOCTYPE html>\n<html>\n  <body>\n    <'
  await FileSystem.writeFile(`${tmpDir}/test.html`, text)
  await Main.openUri(`${tmpDir}/test.html`)
  await Editor.setCursor(3, 5)
  await Editor.openCompletion()

  const completions = Locator('#Completions')
  await expect(completions).toBeVisible()
  const completionItems = completions.locator('.EditorCompletionItem')
  await expect(completionItems.nth(0)).toHaveText('a')

  await Editor.type('h')
  await expect(completionItems.nth(0)).toHaveText('h1')
  await EditorCompletion.selectIndex(0)
  await Editor.shouldHaveText(`${text}h1`)
}
