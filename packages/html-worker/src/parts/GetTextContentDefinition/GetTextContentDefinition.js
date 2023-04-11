import * as GetEmbeddedContent from '../GetEmbeddedContent/GetEmbeddedContent.js'
import * as TagName from '../TagName/TagName.js'

const getModule = (tagName) => {
  switch (tagName) {
    case TagName.Script:
      return import(
        '../GetTextContentDefinitionScript/GetTextContentDefinitionScript.js'
      )
    default:
      return undefined
  }
}

export const getTextContentDefinition = async (
  uri,
  text,
  tokens,
  index,
  offset
) => {
  const { startTagIndex, startTag, endTagIndex } =
    GetEmbeddedContent.getEmbeddedContent(tokens, index)
  const embeddedContent = text.slice(startTagIndex, endTagIndex)
  const relativeOffset = offset - startTagIndex
  const module = await getModule(startTag)
  if (!module) {
    return []
  }
  return module.getDefinition(uri, embeddedContent, relativeOffset)
}
