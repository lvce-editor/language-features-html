const importJsonNode = async (path) => {
  const fs = await import('fs/promises')
  const data = await fs.readFile(path, 'utf8')
  return JSON.parse(data)
}

const importJsonBrowser = async (path) => {
  try {
    const absolutePath = import.meta.resolve(`../../../${path}`)
    const response = await fetch(absolutePath)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const json = await response.json()
    return json
  } catch (error) {
    throw new Error(`Failed to import ${path}: ${error}`)
  }
}

// TODO use import json once supported
export const importJson = async (path) => {
  if (typeof process !== 'undefined') {
    return importJsonNode(path)
  }
  return importJsonBrowser(path)
}
