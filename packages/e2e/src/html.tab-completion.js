const trimLines = (string) => {
  return string.split('\n').join('')
}

test('html.tab-completion', async () => {
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
})
