import type { Test } from '@lvce-editor/test-with-playwright'

const toFileUri = (path: string) =>
  `file://${path.split('/').map(encodeURIComponent).join('/')}`

export const name = 'javascript.go-to-definition'

export const test: Test = async ({
  FileSystem,
  Command,
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
  const activeCssUri = await Command.execute('GetActiveEditor.getActiveUri')
  if (activeCssUri !== toFileUri(`${tmpDir}/index.css`)) {
    throw new Error(`Expected CSS file to open, got ${activeCssUri}`)
  }

  // act
  await Main.openUri(`${tmpDir}/test.html`)
  await Editor.setCursor(1, html.split('\n')[1].indexOf('app.js') + 1)
  await Editor.goToDefinition()

  // assert
  const activeScriptUri = await Command.execute('GetActiveEditor.getActiveUri')
  if (activeScriptUri !== toFileUri(`${tmpDir}/app.js`)) {
    throw new Error(`Expected JavaScript file to open, got ${activeScriptUri}`)
  }
}
