import * as ImportJson from '../ImportJson/ImportJson.js'
import * as TokenType from '../TokenType/TokenType.js'

const attributesData = await ImportJson.importJson('data/html-attributes.json')

const VALUE_COMPLETIONS = new Map()
for (const item of attributesData.attributesWithValues) {
  VALUE_COMPLETIONS.set(`${item.tagName}:${item.name}`, item.values)
}
for (const item of attributesData.globalAttributesWithValues) {
  VALUE_COMPLETIONS.set(`*:${item.name}`, item.values)
}

const toCompletion = (value) => ({
  label: value,
  snippet: value,
  kind: 1,
})

/**
 * @param {any[]} tokens
 * @param {number} index
 */
export const getAttributeValueCompletions = (tokens, index) => {
  let tagName = ''
  let attributeName = ''
  for (let i = index - 1; i >= 0; i--) {
    const token = tokens[i]
    if (token.type === TokenType.OpeningAngleBracket) {
      break
    }
    if (!attributeName && token.type === TokenType.AttributeName) {
      attributeName = token.text.toLowerCase()
    }
    if (token.type === TokenType.TagNameStart) {
      tagName = token.text.toLowerCase()
    }
  }
  if (!tagName || !attributeName) {
    return []
  }
  const values = VALUE_COMPLETIONS.get(`${tagName}:${attributeName}`) ??
    VALUE_COMPLETIONS.get(`*:${attributeName}`)
  return values ? values.map(toCompletion) : []
}
