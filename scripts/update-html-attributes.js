import htmlData from '@vscode/web-custom-data/data/browsers.html-data.json' assert { type: 'json' }
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const root = path.join(__dirname, '..')

const generateAttributesJson = (htmlData) => {
  const { globalAttributes } = htmlData
  const attributes = []
  for (const globalAttribute of globalAttributes) {
    attributes.push({
      name: globalAttribute.name,
    })
  }
  return {
    globalAttributes: attributes,
  }
}

const writeJson = async (path, json) => {
  const content = JSON.stringify(json, null, 2) + '\n'
  await writeFile(path, content)
}

const main = async () => {
  const attributesJson = generateAttributesJson(htmlData)
  const attributesJsonPath = join(
    root,
    'packages',
    'html-worker',
    'data',
    'html-attributes.json'
  )
  await writeJson(attributesJsonPath, attributesJson)
}

main()
