import { exportStatic } from '@lvce-editor/shared-process'
import { bundleJs } from '@lvce-editor/package-extension'
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path, { join } from 'node:path'
import { root } from '../Root/Root.js'
import { validateProductionExtension } from '../ValidateProductionExtension/ValidateProductionExtension.js'

const { commitHash } = await exportStatic({
  extensionPath: 'packages/extension',
  testPath: 'packages/e2e',
  root,
})

for (const dirent of ['data']) {
  await cp(
    path.join(root, 'packages', 'html-worker', dirent),
    path.join(
      root,
      'dist',
      commitHash,
      'extensions',
      'builtin.language-features-html',
      'html-worker',
      dirent,
    ),
    {
      recursive: true,
      force: true,
      filter: (source) => !source.endsWith('.js'),
    },
  )
}

const extensionDistPath = path.join(
  root,
  'dist',
  commitHash,
  'extensions',
  'builtin.language-features-html',
)

const replace = async (path, occurrence, replacement) => {
  const oldContent = await readFile(path, 'utf8')
  // @ts-ignore
  const newContent = oldContent.replaceAll(occurrence, replacement)
  await writeFile(path, newContent)
}

await replace(
  join(extensionDistPath, 'extension.json'),
  '"browser": "src/languageFeaturesHtmlMain.js"',
  '"browser": "dist/languageFeaturesHtmlMain.js"',
)

await mkdir(join(extensionDistPath, 'dist'), { recursive: true })
await mkdir(join(extensionDistPath, 'html-worker', 'dist'), { recursive: true })
await bundleJs(
  join(root, 'packages', 'extension', 'src', 'languageFeaturesHtmlMain.js'),
  join(extensionDistPath, 'dist', 'languageFeaturesHtmlMain.js'),
  false,
)
await rm(join(extensionDistPath, 'dist', 'languageFeaturesHtmlMain.js.map'), {
  force: true,
})
await bundleJs(
  join(root, 'packages', 'html-worker', 'src', 'htmlWorkerRpcMain.js'),
  join(extensionDistPath, 'html-worker', 'dist', 'htmlWorkerMain.js'),
  false,
)
await replace(
  join(extensionDistPath, 'dist', 'languageFeaturesHtmlMain.js'),
  '../../../../html-worker/src/htmlWorkerMain.js',
  '../html-worker/dist/htmlWorkerMain.js',
)
await replace(
  join(extensionDistPath, 'html-worker', 'dist', 'htmlWorkerMain.js'),
  '../../../../../node_modules/typescript/lib',
  '../../typescript/lib',
)
await replace(
  join(extensionDistPath, 'html-worker', 'dist', 'htmlWorkerMain.js'),
  '../../../${path}',
  '../${path}',
)

const typeScriptLibPath = join(root, 'node_modules', 'typescript', 'lib')
const typeScriptPath = join(root, 'node_modules', 'typescript')

await mkdir(
  join(
    root,
    'dist',
    commitHash,
    'extensions',
    'builtin.language-features-html',
    'typescript',
  ),
)

const typescriptDirents = await readdir(typeScriptLibPath)
for (const typeScriptDirent of typescriptDirents) {
  if (
    typeScriptDirent.startsWith('lib.') ||
    typeScriptDirent === 'typescript-esm.js'
  ) {
    await cp(
      join(typeScriptLibPath, typeScriptDirent),
      join(
        root,
        'dist',
        commitHash,
        'extensions',
        'builtin.language-features-html',
        'typescript',
        'lib',
        typeScriptDirent,
      ),
    )
  }
}

for (const dirent of ['README.md', 'LICENSE.txt', 'package.json']) {
  await cp(
    join(typeScriptPath, dirent),
    join(
      root,
      'dist',
      commitHash,
      'extensions',
      'builtin.language-features-html',
      'typescript',
      dirent,
    ),
  )
}

await rm(join(extensionDistPath, 'src'), { recursive: true, force: true })
await rm(join(extensionDistPath, 'html-worker', 'src'), {
  recursive: true,
  force: true,
})

await validateProductionExtension(extensionDistPath)
