// TODO update html attributes with vscode web custom data
import htmlData from '@vscode/web-custom-data/data/browsers.html-data.json' with { type: 'json' }
import { join } from 'node:path'
import * as JsonFile from '../JsonFile/JsonFile.js'
import * as Root from '../Root/Root.js'

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

const main = async () => {
  const attributesJson = generateAttributesJson(htmlData)
  const attributesJsonPath = join(
    Root.root,
    'packages',
    'html-worker',
    'data',
    'html-attributes.json',
  )
  await JsonFile.writeJson(attributesJsonPath, attributesJson)
}

main()
