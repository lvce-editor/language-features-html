export const name = 'javascript.completion'

export const skip = 1

export const test = async ({ FileSystem, Main, Editor, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/test.html`,
    `<script>
let x = 1
x.
  </script>`,
  )
  await Main.openUri(`${tmpDir}/test.html`)
  await Editor.setCursor(2, 2)

  // act
  await Editor.openCompletion()

  // assert
  const completions = Locator('#Completions')
  await expect(completions).toBeVisible()
  const completionItems = completions.locator('.EditorCompletionItem')
  // TODO
  await expect(completionItems.nth(0)).toHaveText('toExponential')
}
