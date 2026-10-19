import * as Assert from '../Assert/Assert.js'
import * as GetTextContentDefinition from '../GetTextContentDefinition/GetTextContentDefinition.js'
import * as GetTokenIndexAtOffset from '../GetTokenIndexAtOffset/GetTokenIndexAtOffset.js'
import * as TokenType from '../TokenType/TokenType.js'
import { tokenizeHtml } from '../TokenizeHtml/TokenizeHtml.js'

const NO_DEFINITION = undefined

const getTagNameIndex = (tokens, index) => {
  for (let i = index; i >= 0; i--) {
    if (tokens[i].type === TokenType.TagNameStart) {
      return i
    }
    if (tokens[i].type === TokenType.ClosingAngleBracket) {
      return -1
    }
  }
  return -1
}

const getAttributeValues = (tokens, tagNameIndex) => {
  const attributes = new Map()
  let attributeName = ''
  let expectingValue = false
  for (let i = tagNameIndex + 1; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type === TokenType.ClosingAngleBracket) {
      break
    }
    if (token.type === TokenType.AttributeName) {
      attributeName = token.text.toLowerCase()
      expectingValue = false
      continue
    }
    if (token.type === TokenType.AttributeEqualSign && attributeName) {
      expectingValue = true
      continue
    }
    if (token.type === TokenType.AttributeValue && expectingValue) {
      attributes.set(attributeName, token.text)
      expectingValue = false
    }
  }
  return attributes
}

const getAttributeValueDefinition = (uri, tokens, index, offset) => {
  const valueToken = tokens[index]
  if (offset < valueToken.offset || offset >= valueToken.offset + valueToken.text.length) {
    return NO_DEFINITION
  }
  const tagNameIndex = getTagNameIndex(tokens, index)
  if (tagNameIndex === -1) {
    return NO_DEFINITION
  }
  const tagName = tokens[tagNameIndex].text.toLowerCase()
  const attributes = getAttributeValues(tokens, tagNameIndex)
  const attributeName = tokens
    .slice(tagNameIndex + 1, index)
    .filter((token) => token.type === TokenType.AttributeName)
    .at(-1)?.text.toLowerCase()
  const isScriptSource = tagName === 'script' && attributeName === 'src'
  const isStylesheet =
    tagName === 'link' &&
    attributeName === 'href' &&
    (attributes.get('rel') || '').toLowerCase().split(/\s+/).includes('stylesheet')
  if (!isScriptSource && !isStylesheet) {
    return NO_DEFINITION
  }
  try {
    const documentUrl = new URL(uri)
    if (documentUrl.protocol !== 'file:' || !valueToken.text) {
      return NO_DEFINITION
    }
    const targetUrl = new URL(valueToken.text, documentUrl)
    if (targetUrl.protocol !== 'file:' || targetUrl.hash) {
      return NO_DEFINITION
    }
    return {
      uri: targetUrl.toString(),
      startOffset: 0,
      endOffset: 0,
    }
  } catch {
    return NO_DEFINITION
  }
}

// TODO completions should have property offset?

/**
 *
 * @param {string} text
 * @param {number} offset
 */
export const htmlDefinition = (uri, text, offset) => {
  try {
    Assert.string(uri)
    Assert.string(text)
    Assert.number(offset)
    const tokens = tokenizeHtml(text)
    const index = GetTokenIndexAtOffset.getTokenIndexAtOffset(tokens, offset)
    const tokenAtOffset = tokens[index]
    switch (tokenAtOffset.type) {
      case TokenType.AttributeValue:
        return getAttributeValueDefinition(uri, tokens, index, offset)
      case TokenType.Content:
        return GetTextContentDefinition.getTextContentDefinition(
          uri,
          text,
          tokens,
          index,
          offset
        )
      default:
    }
  } catch (error) {
    console.error(error)
  }
  return NO_DEFINITION
}
