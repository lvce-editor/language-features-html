const selfClosingTags = new Set([
  'area',
  'base',
  'br',
  'link',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
])

/**
 * @param {string} tag
 */
export const isSelfClosingTag = (tag) => {
  return selfClosingTags.has(tag)
}
