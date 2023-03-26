import { exportStatic } from '@lvce-editor/shared-process'
import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path, { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

await exportStatic({
  extensionPath: 'packages/extension',
  testPath: 'packages/e2e',
  root,
})

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

const dirents = await readdir(path.join(root, 'dist'))
const commitHash = dirents.find(isCommitHash) || ''

for (const dirent of ['src', 'data']) {
  await cp(
    path.join(root, 'packages', 'html-worker', dirent),
    path.join(
      root,
      'dist',
      commitHash,
      'extensions',
      'builtin.language-features-html',
      'html-worker',
      dirent
    ),
    { recursive: true, force: true }
  )
}

const workerUrlFilePath = path.join(
  root,
  'dist',
  commitHash,
  'extensions',
  'builtin.language-features-html',
  'src',
  'parts',
  'HtmlWorkerUrl',
  'HtmlWorkerUrl.js'
)

const replace = async (path, occurrence, replacement) => {
  const oldContent = await readFile(path, 'utf8')
  // @ts-ignore
  const newContent = oldContent.replaceAll(occurrence, replacement)
  await writeFile(path, newContent)
}

await replace(
  workerUrlFilePath,
  '../../../../html-worker/src/htmlWorkerMain.js',
  '../../../html-worker/src/htmlWorkerMain.js'
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
    'typescript'
  )
)

const typescriptDirents = await readdir(typeScriptLibPath)
for (const typeScriptDirent of typescriptDirents) {
  if (
    typeScriptDirent.startsWith('lib.') ||
    typeScriptDirent === 'typescript.js'
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
        typeScriptDirent
      )
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
      dirent
    )
  )
}

const typescriptPathFile = path.join(
  root,
  'dist',
  commitHash,
  'extensions',
  'builtin.language-features-html',
  'html-worker',
  'src',
  'parts',
  'TypeScriptPath',
  'TypeScriptPath.js'
)

await replace(
  typescriptPathFile,
  '../../../../../node_modules/typescript/lib',
  `../../../../typescript/lib`
)
