const importJsonNode = async (path) => {
  const fs = await import('fs/promises')
  const { fileURLToPath } = await import('url')
  const absoluteUri = new URL(`../../../${path}`, import.meta.url).toString()
  const absolutePath = fileURLToPath(absoluteUri)
  const data = await fs.readFile(absolutePath, 'utf8')
  return JSON.parse(data)
}

const importJsonBrowser = async (path) => {
  const absolutePath = import.meta.resolve(`../../../${path}`)
  const response = await fetch(absolutePath)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const json = await response.json()
  return json
}

// TODO use import json once supported
export const importJson = async (path) => {
  if (typeof process !== 'undefined') {
    return importJsonNode(path)
  }
  return importJsonBrowser(path)
}
