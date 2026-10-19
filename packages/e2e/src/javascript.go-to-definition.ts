import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'javascript.go-to-definition'

export const test: Test = async ({
  FileSystem,
  Main,
  Editor,
  Locator,
  expect,
}) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  const html = `<link rel="stylesheet" href="index.css">
<script src="app.js"></script>`
  await FileSystem.writeFile(`${tmpDir}/test.html`, html)
  await FileSystem.writeFile(`${tmpDir}/index.css`, 'h1 { color: red; }')
  await FileSystem.writeFile(`${tmpDir}/app.js`, 'const app = true')
  await Main.openUri(`${tmpDir}/test.html`)
  await Editor.setCursor(0, html.split('\n')[0].indexOf('index.css') + 1)

  // act
  await Editor.goToDefinition()

  // assert
  await Editor.shouldHaveUri(`${tmpDir}/index.css`)

  // act
  await Main.openUri(`${tmpDir}/test.html`)
  await Editor.setCursor(1, html.split('\n')[1].indexOf('app.js') + 1)
  await Editor.goToDefinition()

  // assert
  await Editor.shouldHaveUri(`${tmpDir}/app.js`)
}
