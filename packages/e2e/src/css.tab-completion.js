const trimLines = (string) => {
  return string.split('\n').join('')
}

export const skip = true

export const name = 'css.tab-completion'

export const test = async ({ FileSystem, Main, Editor, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/test.html`,
    `<style>
h1 {
  d
}
</style>`,
  )
  await Main.openUri(`${tmpDir}/test.html`)
  await Editor.setCursor(2, 3)

  // act
  await Editor.executeTabCompletion()

  // assert
  const editor = Locator('.Editor')
  await expect(editor).toHaveText(
    trimLines(`<style>
h1 {
  display:
}
</style>`),
  )
}
