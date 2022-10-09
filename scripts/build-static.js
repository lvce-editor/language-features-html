import fs, { cpSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import path, { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const root = path.join(__dirname, '..')
const pathPrefix = process.env.PATH_PREFIX || ''

const dirents = readdirSync(
  join(root, 'node_modules', '@lvce-editor', 'server', 'static')
)
const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}
const commitHash = dirents.find(isCommitHash) || ''

const readJson = (path) => {
  const content = readFileSync(path, 'utf8')
  return { ...JSON.parse(content), path }
}

const extensionJson = readJson(
  join(root, 'packages', 'extension', 'extension.json')
)
const id = extensionJson.id

fs.rmSync(join(root, 'dist'), { recursive: true, force: true })

fs.mkdirSync(path.join(root, 'dist'))

fs.rmSync(join(root, 'dist', commitHash, 'extensions', id), {
  recursive: true,
  force: true,
})
fs.mkdirSync(join(root, 'dist', commitHash, 'extensions', id), {
  recursive: true,
})
fs.cpSync(
  join(root, 'packages', 'extension', 'src'),
  join(root, 'dist', commitHash, 'extensions', id, 'src'),
  { recursive: true }
)
fs.cpSync(
  join(root, 'packages', 'extension', 'data'),
  join(root, 'dist', commitHash, 'extensions', id, 'data'),
  { recursive: true }
)
fs.cpSync(
  join(root, 'packages', 'extension', 'extension.json'),
  join(root, 'dist', commitHash, 'extensions', id, 'extension.json'),
  { recursive: true }
)
fs.cpSync(
  join(root, 'packages', 'extension', 'icon.png'),
  join(root, 'dist', commitHash, 'extensions', id, 'icon.png'),
  { recursive: true }
)
fs.cpSync(
  join(root, 'README.md'),
  join(root, 'dist', commitHash, 'extensions', id, 'README.md'),
  { recursive: true }
)
fs.cpSync(
  join(root, 'node_modules', '@lvce-editor', 'server', 'static'),
  join(root, 'dist'),
  {
    recursive: true,
  }
)

const replaceSync = (path, occurrence, replacement) => {
  const oldContent = readFileSync(path, 'utf8')
  if (!oldContent.includes(occurrence)) {
    throw new Error(`failed to replace occurrence ${occurrence}: Not found`)
  }
  // @ts-ignore
  const newContent = oldContent.replaceAll(occurrence, replacement)
  writeFileSync(path, newContent)
}

replaceSync(
  join(
    root,
    'dist',
    commitHash,
    'packages',
    'renderer-process',
    'dist',
    'rendererProcessMain.js'
  ),
  'platform = getPlatform();',
  'platform = "web"'
)
replaceSync(
  join(
    root,
    'dist',
    commitHash,
    'packages',
    'renderer-process',
    'dist',
    'rendererProcessMain.js'
  ),
  `return "/${commitHash}";`,
  `return "${pathPrefix}/${commitHash}";`
)
replaceSync(
  join(
    root,
    'dist',
    commitHash,
    'packages',
    'renderer-worker',
    'dist',
    'rendererWorkerMain.js'
  ),
  'platform = getPlatform();',
  'platform = "web"'
)
replaceSync(
  join(
    root,
    'dist',
    commitHash,
    'packages',
    'renderer-worker',
    'dist',
    'rendererWorkerMain.js'
  ),
  `platform2 = "remote";`,
  'platform2 = "web";'
)
replaceSync(
  join(
    root,
    'dist',
    commitHash,
    'packages',
    'renderer-worker',
    'dist',
    'rendererWorkerMain.js'
  ),
  `return "/${commitHash}";`,
  `return "${pathPrefix}/${commitHash}";`
)
replaceSync(
  join(
    root,
    'dist',
    commitHash,
    'packages',
    'renderer-worker',
    'dist',
    'rendererWorkerMain.js'
  ),
  `getColorThemeUrlWeb = (colorThemeId) => {
      return \`/extensions/builtin.theme-\${colorThemeId}/color-theme.json\`;
    };`,
  `const getColorThemeUrlWeb = (colorThemeId) => {
      const assetDir = getAssetDir()
      return \`\${assetDir}/themes/\${colorThemeId}.json\`
    }`
)
replaceSync(
  join(
    root,
    'dist',
    commitHash,
    'packages',
    'renderer-worker',
    'dist',
    'rendererWorkerMain.js'
  ),
  `getIconThemeUrl = (iconThemeId) => {
      return \`/extensions/builtin.\${iconThemeId}/icon-theme.json\`;
    }`,
  `getIconThemeUrl = (iconThemeId) => {
      const assetDir = getAssetDir()
      return \`\${assetDir}/icon-themes/\${iconThemeId}.json\`
    }`
)
replaceSync(
  join(
    root,
    'dist',
    commitHash,
    'packages',
    'renderer-worker',
    'dist',
    'rendererWorkerMain.js'
  ),
  `return \`\${extensionPath}\${value}\``,
  `return \`${pathPrefix}/${commitHash}/file-icons/\${value.slice(7)}\``
)
replaceSync(
  join(root, 'dist', commitHash, 'config', 'defaultSettings.json'),
  `"workbench.saveStateOnVisibilityChange": false`,
  `"workbench.saveStateOnVisibilityChange": true`
)

const extensionDirents = readdirSync(
  join(root, 'node_modules', '@lvce-editor', 'shared-process', 'extensions')
)

const isLanguageBasics = (dirent) => {
  return dirent.startsWith('builtin.language-basics')
}

const isTheme = (dirent) => {
  return dirent.startsWith('builtin.theme-')
}

const isIconTheme = (dirent) => {
  return dirent === 'builtin.vscode-icons'
}

const writeJson = (path, json) => {
  const content = JSON.stringify(json, null, 2) + '\n'
  writeFileSync(path, content)
}

const getManifestPath = (dirent) => {
  return join(
    root,
    'node_modules',
    '@lvce-editor',
    'shared-process',
    'extensions',
    dirent,
    'extension.json'
  )
}

const manifests = extensionDirents.map(getManifestPath).map(readJson)

const getLanguages = (extension) => {
  const languages = []
  for (const language of extension.languages || []) {
    languages.push({
      ...language,
      tokenize: `${pathPrefix}/${commitHash}/extensions/${extension.id}/${language.tokenize}`,
    })
  }
  return languages
}
const languages = manifests.flatMap(getLanguages)
writeJson(join(root, 'dist', commitHash, 'config', 'languages.json'), languages)

for (const manifest of manifests) {
  const { id } = manifest
  if (!isLanguageBasics(id)) {
    continue
  }
  cpSync(
    join(
      root,
      'node_modules',
      '@lvce-editor',
      'shared-process',
      'extensions',
      id
    ),
    join(root, 'dist', commitHash, 'extensions', id),
    {
      recursive: true,
    }
  )
}

const getThemeName = (dirent) => {
  return dirent.slice('builtin.theme-'.length)
}

const isThemeManifest = (manifest) => {
  return isTheme(manifest.id)
}

for (const manifest of manifests) {
  const { id } = manifest
  if (!isTheme(id)) {
    continue
  }
  const themeId = getThemeName(id)
  cpSync(
    join(
      root,
      'node_modules',
      '@lvce-editor',
      'shared-process',
      'extensions',
      id,
      'color-theme.json'
    ),
    join(root, 'dist', commitHash, 'themes', `${themeId}.json`)
  )
}

const getId = (manifest) => {
  return manifest.id
}

const themeIds = [...manifests.map(getId).filter(isTheme).map(getThemeName)]
writeJson(join(root, 'dist', commitHash, 'config', 'themes.json'), themeIds)

for (const manifest of manifests) {
  const { id } = manifest
  if (!isIconTheme(id)) {
    continue
  }
  const iconThemeId = id.slice('builtin.'.length)
  cpSync(
    join(
      root,
      'node_modules',
      '@lvce-editor',
      'shared-process',
      'extensions',
      id,
      'icon-theme.json'
    ),
    join(root, 'dist', commitHash, 'icon-themes', `${iconThemeId}.json`)
  )
  cpSync(
    join(
      root,
      'node_modules',
      '@lvce-editor',
      'shared-process',
      'extensions',
      id,
      'icons'
    ),
    join(root, 'dist', commitHash, 'file-icons'),
    {
      recursive: true,
    }
  )
}

// cpSync(
//   join(root, 'color-theme.json'),
//   join(root, 'dist', commitHash, 'themes', `${name}.json`)
// )
replaceSync(
  join(root, 'dist', 'index.html'),
  `/${commitHash}`,
  `${pathPrefix}/${commitHash}`
)
replaceSync(
  join(root, 'dist', 'index.html'),
  `/manifest.json`,
  `${pathPrefix}/manifest.json`
)
replaceSync(
  join(root, 'dist', 'index.html'),
  '</title>',
  `</title>
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">`
)
replaceSync(
  join(root, 'dist', 'manifest.json'),
  `/${commitHash}`,
  `${pathPrefix}/${commitHash}`
)

replaceSync(
  join(root, 'dist', commitHash, 'css', 'App.css'),
  `/${commitHash}`,
  `${pathPrefix}/${commitHash}`
)

const isWebExtension = (manifest) => {
  return typeof manifest.browser === 'string'
}

const webExtensions = manifests.filter(isWebExtension)

const compareId = (a, b) => {
  return a.id.localeCompare(b.id)
}

const sortById = (objects) => {
  return [...objects].sort(compareId)
}

const mergeWebExtensions = (webExtensions, extensionJson) => {
  const merged = []
  const seen = []
  if (extensionJson.browser) {
    seen.push(extensionJson.id)
    merged.push({
      ...extensionJson,
      isWeb: true,
      path: `${pathPrefix}/${commitHash}/extensions/${extensionJson.id}`,
    })
  }
  for (const webExtension of webExtensions) {
    if (seen.includes(webExtension.id)) {
      continue
    }
    merged.push({
      ...webExtension,
      isWeb: true,
      path: `${pathPrefix}/${commitHash}/extensions/${webExtension.id}`,
    })
  }
  const sorted = sortById(merged)
  return sorted
}

const mergedWebExtensions = mergeWebExtensions(webExtensions, extensionJson)
writeJson(
  join(root, 'dist', commitHash, 'config', 'webExtensions.json'),
  mergedWebExtensions
)
