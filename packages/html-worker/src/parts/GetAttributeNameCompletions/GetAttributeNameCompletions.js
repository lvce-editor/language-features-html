import * as ImportJson from '../ImportJson/ImportJson.js'

const attributesData = await ImportJson.importJson('data/html-attributes.json')

const toAttributeCompletion = (item) => {
  return {
    label: item.name,
    snippet: `${item.name}="$1"`,
    kind: /* value */ 2,
  }
}

const toAttributeCompletions = (items) => {
  const completions = items.map(toAttributeCompletion)
  return completions
}

const ATTRIBUTE_NAME_COMPLETIONS = toAttributeCompletions(
  attributesData.globalAttributes
)

export const getAttributeNameCompletions = () => {
  return ATTRIBUTE_NAME_COMPLETIONS
}
