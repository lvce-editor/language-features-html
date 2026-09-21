import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'html.wrap-tag'

export const test: Test = async ({ Command, Editor, FileSystem, Locator, Main }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const uri = `${tmpDir}/test.html`
  await FileSystem.writeFile(uri, '<button>hello world</button>')
  await Main.openUri(uri)
  await Locator('.EditorInput textarea').click()
  await Editor.setSelections(new Uint32Array([0, 1, 0, 27]))

  await Command.execute('html.wrapTag')

  await Editor.shouldHaveText('<div><button>hello world</button></div>')
  await Editor.undo()
  await Editor.shouldHaveText('<button>hello world</button>')
}
