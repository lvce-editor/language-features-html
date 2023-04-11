export const name = 'css.completion'

export const test = async ({ FileSystem, Main, Editor, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/test.html`,
    `<script>
let x = 1
x
</script>`
  )
  await Main.openUri(`${tmpDir}/test.html`)
  await Editor.setCursor(2, 1)

  // act
  await Editor.goToDefinition()

  // assert
  // TODO cursor should be at definition
}
