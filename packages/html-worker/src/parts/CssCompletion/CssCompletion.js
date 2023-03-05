import * as TokenType from '../CssTokenType/CssTokenType.js'
import * as GetPropertyNameCompletions from '../GetPropertyNameCompletions/GetPropertyNameCompletions.js'
import * as GetPropertyValueCompletions from '../GetPropertyValueCompletions/GetPropertyValueCompletions.js'
import { tokenizeCss } from '../TokenizeCss/TokenizeCss.js'

// {
//   none: {},
//   overline: {},
//   underline: {},
//   'line-through': {},
// },

const toSnippet = (propertyName) => {
  return {
    label: propertyName,
    snippet: `${propertyName}: `,
    kind: /* Property */ 1,
  }
}

/**
 * @type{vscode.Completion[]}
 */
const NULL_COMPLETIONS = []

/**
 *
 * @param {string} text
 * @param {number} offset
 * @returns {vscode.Completion[]}
 */
export const cssCompletion = (text, offset) => {
  const parsed = tokenizeCss(text)
  const nodeIndex = parsed.findIndex((node) => node.offset >= offset)
  const nodeAtOffset = parsed[nodeIndex]
  if (!nodeAtOffset) {
    return NULL_COMPLETIONS
  }
  switch (nodeAtOffset.type) {
    case TokenType.Whitespace:
    case TokenType.PropertyName:
      return GetPropertyNameCompletions.getPropertyNameCompletions()
    case TokenType.PropertyValue:
      return GetPropertyValueCompletions.getPropertyValueCompletions(
        text,
        parsed,
        nodeIndex
      )
    default:
      return NULL_COMPLETIONS
  }
}
