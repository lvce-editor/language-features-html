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

  </head>
</html>`,
  )
  await Main.openUri(`${tmpDir}/test.html`)
  const editor = Locator('.Editor')
  await editor.click()
  await Editor.setCursor(3, 0)

  // act
  for (const character of '    link') {
    await KeyBoard.press(character === ' ' ? 'Space' : character)
  }
  await Editor.executeTabCompletion()
  await expect(editor).toHaveText(
    trimLines(`<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="">
  </head>
</html>`),
  )
  for (const character of 'style.css') {
    await KeyBoard.press(character)
  }

  // assert
  await expect(editor).toHaveText(
    trimLines(`<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css">
  </head>
</html>`),
  )
}
