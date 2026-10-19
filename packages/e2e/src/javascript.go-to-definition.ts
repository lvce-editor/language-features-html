import type { Test } from '@lvce-editor/test-with-playwright'

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
  const activeCssDocument = await Command.execute('GetActiveEditor.getTextDocument')
  const activeCssUri = activeCssDocument?.uri
  if (activeCssUri !== `${tmpDir}/index.css`) {
    throw new Error(`Expected CSS file to open, got ${activeCssUri}`)
  }

  // act
  await Main.openUri(`${tmpDir}/test.html`)
  await Editor.setCursor(1, html.split('\n')[1].indexOf('app.js') + 1)
  await Editor.goToDefinition()

  // assert
  const activeScriptDocument = await Command.execute('GetActiveEditor.getTextDocument')
  const activeScriptUri = activeScriptDocument?.uri
  if (activeScriptUri !== `${tmpDir}/app.js`) {
    throw new Error(`Expected JavaScript file to open, got ${activeScriptUri}`)
  }
}
