import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'html.completion-accept'

export const test: Test = async ({
  Editor,
  EditorCompletion,
  FileSystem,
  Main,
}) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.html`, '<')
  await Main.openUri(`${tmpDir}/test.html`)
  await Editor.setCursor(0, 1)

  // act
  await Editor.openCompletion()
  await EditorCompletion.selectIndex(0)

  // assert
  await Editor.shouldHaveText('<a')
}
