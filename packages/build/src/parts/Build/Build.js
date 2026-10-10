import { bundleJs, packageExtension } from '@lvce-editor/package-extension'
import fs, { readFileSync, writeFileSync } from 'fs'
import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path, { join } from 'path'
import { root } from '../Root/Root.js'
import { validateProductionExtension } from '../ValidateProductionExtension/ValidateProductionExtension.js'

const NOT_NEEDED = []

const extension = path.join(root, 'packages', 'extension')
const htmlWorker = path.join(root, 'packages', 'html-worker')

fs.rmSync(join(root, 'dist'), { recursive: true, force: true })

fs.mkdirSync(path.join(root, 'dist'))

const packageJson = JSON.parse(
  readFileSync(join(extension, 'package.json')).toString(),
)
delete packageJson.xo
delete packageJson.jest
delete packageJson.prettier
delete packageJson.devDependencies
delete packageJson.scripts
packageJson.main = 'dist/languageFeaturesHtmlMain.js'

fs.writeFileSync(
  join(root, 'dist', 'package.json'),
  JSON.stringify(packageJson, null, 2) + '\n',
)
fs.copyFileSync(join(root, 'README.md'), join(root, 'dist', 'README.md'))
fs.copyFileSync(join(extension, 'icon.png'), join(root, 'dist', 'icon.png'))
fs.copyFileSync(
  join(extension, 'extension.json'),
  join(root, 'dist', 'extension.json'),
)
fs.cpSync(join(htmlWorker, 'data'), join(root, 'dist', 'html-worker', 'data'), {
  recursive: true,
  filter: (source) => !source.endsWith('.js'),
})

const getAllDependencies = (obj) => {
  if (!obj || !obj.dependencies) {
    return []
  }
  return [obj, ...Object.values(obj.dependencies).flatMap(getAllDependencies)]
}

for (const notNeeded of NOT_NEEDED) {
  fs.rmSync(join(root, 'dist', notNeeded), { force: true, recursive: true })
}

const replace = async (path, occurrence, replacement) => {
  const oldContent = await readFile(path, 'utf8')
  const newContent = oldContent.replaceAll(occurrence, replacement)
  await writeFile(path, newContent)
}

const bundledExtensionMain = join(
  root,
  'dist',
  'dist',
  'languageFeaturesHtmlMain.js',
)
await bundleJs(
  join(extension, 'src', 'languageFeaturesHtmlMain.js'),
  bundledExtensionMain,
  false,
)
await replace(
  bundledExtensionMain,
  '../../../../html-worker/src/htmlWorkerMain.js',
  '../html-worker/dist/htmlWorkerMain.js',
)

const extensionJsonPath = join(root, 'dist', 'extension.json')
const extensionJson = readFileSync(extensionJsonPath, 'utf8').replace(
  '"browser": "src/languageFeaturesHtmlMain.js"',
  '"browser": "dist/languageFeaturesHtmlMain.js"',
)
writeFileSync(extensionJsonPath, extensionJson)

const typeScriptLibPath = join(root, 'node_modules', 'typescript', 'lib')
const typeScriptPath = join(root, 'node_modules', 'typescript')

await mkdir(join(root, 'dist', 'typescript'))

const typescriptDirents = await readdir(typeScriptLibPath)
for (const typeScriptDirent of typescriptDirents) {
  if (
    typeScriptDirent.startsWith('lib.') ||
    typeScriptDirent === 'typescript-esm.js'
  ) {
    await cp(
      join(typeScriptLibPath, typeScriptDirent),
      join(root, 'dist', 'typescript', 'lib', typeScriptDirent),
    )
  }
}

for (const dirent of ['README.md', 'LICENSE.txt', 'package.json']) {
  await cp(
    join(typeScriptPath, dirent),
    join(root, 'dist', 'typescript', dirent),
  )
}

const bundledHtmlWorkerMain = join(
  root,
  'dist',
  'html-worker',
  'dist',
  'htmlWorkerMain.js',
)
await bundleJs(
  join(htmlWorker, 'src', 'htmlWorkerRpcMain.js'),
  bundledHtmlWorkerMain,
  false,
)
await replace(
  bundledHtmlWorkerMain,
  '../../../../../node_modules/typescript/lib',
  '../../typescript/lib',
)
await replace(bundledHtmlWorkerMain, '../../../${path}', '../${path}')

await validateProductionExtension(join(root, 'dist'))

await packageExtension({
  highestCompression: true,
  inDir: join(root, 'dist'),
  outFile: join(root, 'extension.tar.br'),
})
