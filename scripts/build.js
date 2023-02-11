import { execSync } from 'child_process'
import fs, { readFileSync, writeFileSync } from 'fs'
import path, { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { packageExtension } from '@lvce-editor/package-extension'

const NOT_NEEDED = []

const __dirname = dirname(fileURLToPath(import.meta.url))

const root = path.join(__dirname, '..')
const extension = path.join(root, 'packages', 'extension')
const htmlWorker = path.join(root, 'packages', 'html-worker')

fs.rmSync(join(root, 'dist'), { recursive: true, force: true })

fs.mkdirSync(path.join(root, 'dist'))

const packageJson = JSON.parse(
  readFileSync(join(extension, 'package.json')).toString()
)
delete packageJson.xo
delete packageJson.jest
delete packageJson.prettier
delete packageJson.devDependencies
delete packageJson.scripts

fs.writeFileSync(
  join(root, 'dist', 'package.json'),
  JSON.stringify(packageJson, null, 2) + '\n'
)
fs.copyFileSync(join(root, 'README.md'), join(root, 'dist', 'README.md'))
fs.copyFileSync(join(extension, 'icon.png'), join(root, 'dist', 'icon.png'))
fs.copyFileSync(
  join(extension, 'extension.json'),
  join(root, 'dist', 'extension.json')
)
fs.cpSync(join(extension, 'src'), join(root, 'dist', 'src'), {
  recursive: true,
})
fs.cpSync(join(htmlWorker, 'src'), join(root, 'dist', 'html-worker', 'src'), {
  recursive: true,
})
fs.cpSync(join(htmlWorker, 'data'), join(root, 'dist', 'html-worker', 'data'), {
  recursive: true,
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

const workerUrlFilePath = path.join(
  root,
  'dist',
  'src',
  'parts',
  'HtmlWorkerUrl',
  'HtmlWorkerUrl.js'
)
const oldContent = readFileSync(workerUrlFilePath, 'utf8')
const newContent = oldContent.replace(
  '../../../../html-worker/src/htmlWorkerMain.js',
  '../../../html-worker/src/htmlWorkerMain.js'
)
writeFileSync(workerUrlFilePath, newContent)

await packageExtension({
  highestCompression: true,
  inDir: join(root, 'dist'),
  outFile: join(root, 'extension.tar.br'),
})
