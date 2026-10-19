import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'html.completion-input-type'

export const test: Test = async ({
  FileSystem,
  Main,
  Editor,
  EditorCompletion,
  Locator,
  expect,
}) => {
  const tmpDir = await FileSystem.getTmpDir()
  const text = '<input type="">'
  await FileSystem.writeFile(`${tmpDir}/input-type.html`, text)
  await Main.openUri(`${tmpDir}/input-type.html`)
  await Editor.setCursor(0, text.indexOf('"') + 1)
  await Editor.openCompletion()
  const completions = Locator('#Completions')
  await expect(completions).toBeVisible()
  await expect(completions).toContainText('number')
  await EditorCompletion.selectIndex(0)
  await Editor.shouldHaveText('<input type="number">')
}
