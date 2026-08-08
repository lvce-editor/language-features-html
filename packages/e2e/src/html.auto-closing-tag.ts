import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'html.auto-closing-tag'

export const test: Test = async ({ Command, FileSystem, Main, Editor, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.html`, '<h1><')
  await Main.openUri(`${tmpDir}/test.html`)
  await Editor.setCursor(0, 5)

  // act
  const editorId = await Command.execute('GetActiveEditor.getActiveEditorId')
  await Command.execute('Viewlet.executeViewletCommand', editorId, 'typeWithAutoClosing', '/')

  // assert
  const editor = Locator('.Editor')
  await expect(editor).toHaveText('<h1></h1>')
}
