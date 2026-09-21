import type { Test } from '@lvce-editor/test-with-playwright'

const trimLines = (string) => {
  return string.split('\n').join('')
}

export const name = 'html.tab-completion-link'

export const test: Test = async ({
  FileSystem,
  Main,
  Editor,
  KeyBoard,
  Locator,
  expect,
}) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/test.html`,
    `<!DOCTYPE html>
<html>
  <head>
    link
  </head>
</html>`,
  )
  await Main.openUri(`${tmpDir}/test.html`)
  await Editor.setCursor(3, 8)

  // act
  await Editor.executeTabCompletion()
  for (const character of 'style.css') {
    await KeyBoard.press(character)
  }

  // assert
  const editor = Locator('.Editor')
  await expect(editor).toHaveText(
    trimLines(`<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css">
  </head>
</html>`),
  )
}
