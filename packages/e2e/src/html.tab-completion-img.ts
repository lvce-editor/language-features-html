import type { Test } from '@lvce-editor/test-with-playwright'

const trimLines = (string) => {
  return string.split('\n').join('')
}

export const name = 'html.tab-completion-img'

export const test: Test = async ({
  Editor,
  FileSystem,
  Locator,
  Main,
  expect,
}) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  const text = '<body>\n  img\n</body>'
  await FileSystem.writeFile(`${tmpDir}/test.html`, text)
  await Main.openUri(`${tmpDir}/test.html`)
  const editor = Locator('.Editor')
  await Editor.setCursor(1, 5)

  // act
  await Editor.executeTabCompletion()

  // assert
  await expect(editor).toHaveText(
    trimLines('<body>\n  <img src="" alt="">\n</body>'),
  )
  await Editor.type('images/photo.png')
  await expect(editor).toHaveText(
    trimLines('<body>\n  <img src="images/photo.png" alt="">\n</body>'),
  )
}
