const trimLines = (string) => {
  return string.split('\n').join('')
}

export const name = 'html.tab-completion'

export const test = async ({ FileSystem, Main, Editor, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.html`, '!')
  await Main.openUri(`${tmpDir}/test.html`)
  await Editor.setCursor(0, 1)

  // act
  await Editor.executeTabCompletion()

  // assert
  const editor = Locator('.Editor')
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
}
