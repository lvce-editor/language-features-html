import { createRequire } from 'node:module'
import { existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from '@lvce-editor/test-with-playwright'

const require = createRequire(import.meta.url)
const serverPackage = require.resolve('@lvce-editor/server/package.json')
const requireFromServer = createRequire(serverPackage)
const staticServerPackage = requireFromServer.resolve('@lvce-editor/static-server/package.json')
const staticRoot = join(dirname(staticServerPackage), 'static')
const themePath = readdirSync(staticRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => join(staticRoot, entry.name, 'extensions', 'builtin.theme-slime'))
  .find((extensionPath) => existsSync(join(extensionPath, 'extension.json')))

if (!themePath) {
  throw new Error(`Slime color theme extension not found in ${staticRoot}`)
}

export default defineConfig({
  // The server's focused extension mode needs its default theme linked explicitly.
  link: [themePath],
})
