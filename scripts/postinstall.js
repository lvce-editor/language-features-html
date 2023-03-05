import { readFileSync, writeFileSync } from 'node:fs'
import path, { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const typeScriptPath = join(
  root,
  'node_modules',
  'typescript',
  'lib',
  'typescript.js'
)

const removeSourceMapUrl = () => {
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

const exportTypeScript = () => {
  const content = readFileSync(typeScriptPath, 'utf8')
  const newContent = content.endsWith('export {ts}\n')
    ? content
    : content + 'export {ts}\n'
  writeFileSync(typeScriptPath, newContent)
}

const main = () => {
  removeSourceMapUrl()
  exportTypeScript()
}

main()
