import assert from 'node:assert/strict'
import { readFile, readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

export const validateProductionExtension = async (extensionPath) => {
  const bundledScripts = [
    'dist/languageFeaturesHtmlMain.js',
    'html-worker/dist/htmlWorkerMain.js',
    'typescript/lib/typescript-esm.js',
  ]
  const manifest = JSON.parse(
    await readFile(join(extensionPath, 'extension.json'), 'utf8'),
  )
  assert.equal(manifest.browser, bundledScripts[0])
  for (const requiredPath of [
    ...bundledScripts,
    'html-worker/data/html-tags.json',
    'html-worker/data/html-attributes.json',
    'html-worker/data/css-properties.json',
    'html-worker/data/lorem-ipsum.json',
    'typescript/lib/lib.d.ts',
  ]) {
    assert.ok((await stat(join(extensionPath, requiredPath))).isFile())
  }

  const visit = async (directory, prefix = '') => {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const relativePath = prefix + entry.name
      assert.notEqual(entry.name, 'src', `Raw source: ${relativePath}`)
      assert.ok(!entry.name.endsWith('.map'), `Sourcemap: ${relativePath}`)
      const absolutePath = join(directory, entry.name)
      if (entry.isDirectory()) {
        await visit(absolutePath, relativePath + '/')
      } else if (entry.name.endsWith('.js')) {
        assert.ok(
          bundledScripts.includes(relativePath),
          `Unbundled script: ${relativePath}`,
        )
        const content = await readFile(absolutePath, 'utf8')
        assert.doesNotMatch(
          content,
          /(?:\/\/|\/\*)[#@]\s*sourceMappingURL=/,
          `Sourcemap reference: ${relativePath}`,
        )
      }
    }
  }
  await visit(extensionPath)
}
