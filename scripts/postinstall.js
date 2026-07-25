import { bundleJs } from '@lvce-editor/package-extension'
import { readFileSync, writeFileSync } from 'node:fs'
import path, { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const extensionMain = join(
  root,
  'packages',
  'extension',
  'src',
  'languageFeaturesHtmlMain.js',
)
const bundledExtensionMain = join(
  root,
  'packages',
  'extension',
  'dist',
  'languageFeaturesHtmlMain.js',
)
const htmlWorkerMain = join(
  root,
  'packages',
  'html-worker',
  'src',
  'htmlWorkerRpcMain.js',
)
const bundledHtmlWorkerMain = join(
  root,
  'packages',
  'html-worker',
  'dist',
  'htmlWorkerMain.js',
)

const replaceAll = (filePath, occurrence, replacement) => {
  const oldContent = readFileSync(filePath, 'utf8')
  const newContent = oldContent.replaceAll(occurrence, replacement)
  writeFileSync(filePath, newContent)
}

const typeScriptPath = join(
  root,
  'node_modules',
  'typescript',
  'lib',
  'typescript.js',
)

const typeScriptPathEsm = join(
  root,
  'node_modules',
  'typescript',
  'lib',
  'typescript-esm.js',
)

const removeSourceMapUrl = (typeScriptPath) => {
  const content = readFileSync(typeScriptPath, 'utf8')
  const sourceMapString = `//# sourceMappingURL=typescript.js.map\n`
  const sourceMapIndex = content.lastIndexOf(sourceMapString)
  const newContent =
    sourceMapIndex === -1
      ? content
      : content.slice(0, sourceMapIndex) +
        content.slice(sourceMapIndex + sourceMapString.length)
  writeFileSync(typeScriptPath, newContent)
}

const modifyTypeScript = (typeScriptPath, typeScriptPathEsm) => {
  const content = readFileSync(typeScriptPath, 'utf8')
  const newContent = content.endsWith('export {ts}\n')
    ? content
    : content + 'export {ts}\n'
  const newContent2 = newContent.includes(
    `process.env.TS_ETW_MODULE_PATH) != null`,
  )
    ? newContent.replace(
        'process.env.TS_ETW_MODULE_PATH',
        `(typeof process === 'undefined' ? undefined : process.env.TS_ETW_MODULE_PATH)`,
      )
    : newContent
  const newContent3 = newContent2.replace(
    `const etwModulePath = process.env.TS_ETW_MODULE_PATH ?? "./node_modules/@microsoft/typescript-etw";`,
    `const etwModulePath = typeof process === 'undefined' ? undefined : process.env.TS_ETW_MODULE_PATH ?? "./node_modules/@microsoft/typescript-etw";`,
  )
  const newContent4 = newContent3.replace(
    `etwModule =   require(etwModulePath);`,
    `etwModulePath = typeof require === 'undefined' ? undefined : require(etwModulePath)`,
  )
  writeFileSync(typeScriptPathEsm, newContent4)
}

const main = async () => {
  modifyTypeScript(typeScriptPath, typeScriptPathEsm)
  removeSourceMapUrl(typeScriptPathEsm)
  await bundleJs(extensionMain, bundledExtensionMain)
  replaceAll(
    bundledExtensionMain,
    '../../../../html-worker/src/htmlWorkerMain.js',
    '../../html-worker/dist/htmlWorkerMain.js',
  )
  await bundleJs(htmlWorkerMain, bundledHtmlWorkerMain)
  replaceAll(
    bundledHtmlWorkerMain,
    '../../../../../node_modules/typescript/lib',
    '../../../node_modules/typescript/lib',
  )
  replaceAll(bundledHtmlWorkerMain, '../../../${path}', '../${path}')
}

await main()
