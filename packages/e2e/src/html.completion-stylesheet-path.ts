import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'html.completion-stylesheet-path'

export const test: Test = async ({
  Editor,
  EditorCompletion,
  FileSystem,
  Locator,
  Main,
  expect,
}) => {
  const tmpDir = await FileSystem.getTmpDir()
  const text = '<link rel="stylesheet" href="inde">'
  await FileSystem.writeFile(`${tmpDir}/index.html`, text)
  await FileSystem.writeFile(`${tmpDir}/index.css`, 'body {}')
  await FileSystem.writeFile(`${tmpDir}/index.scss`, 'body {}')
  await Main.openUri(`${tmpDir}/index.html`)
  await Editor.setCursor(0, text.indexOf('inde') + 4)

  await Editor.openCompletion()

  const items = Locator('#Completions').locator('.EditorCompletionItem')
  await expect(items).toHaveCount(1)
  await expect(items.nth(0)).toHaveText('index.css')
  await EditorCompletion.selectIndex(0)
  await Editor.shouldHaveText('<link rel="stylesheet" href="index.css">')

  await FileSystem.mkdir(`${tmpDir}/styles`)
  const nestedText = "<link href='./styles/' rel='stylesheet'>"
  await FileSystem.writeFile(`${tmpDir}/nested.html`, nestedText)
  await FileSystem.writeFile(`${tmpDir}/styles/theme.css`, 'body {}')
  await FileSystem.writeFile(`${tmpDir}/styles/theme.scss`, 'body {}')
  await Main.openUri(`${tmpDir}/nested.html`)
  await Editor.setCursor(0, nestedText.indexOf("' rel"))
  await Editor.openCompletion()

  await expect(items).toHaveCount(1)
  await expect(items.nth(0)).toHaveText('./styles/theme.css')
  await EditorCompletion.selectIndex(0)
  await Editor.shouldHaveText("<link href='./styles/theme.css' rel='stylesheet'>")

}
