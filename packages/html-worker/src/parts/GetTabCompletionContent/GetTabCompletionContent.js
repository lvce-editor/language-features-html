import * as Assert from '../Assert/Assert.js'
import * as GetEmbeddedContent from '../GetEmbeddedContent/GetEmbeddedContent.js'
import * as TagName from '../TagName/TagName.js'

const getModule = (startTag) => {
  switch (startTag) {
    case TagName.Style:
      return import(
        '../GetTabCompletionContentStyle/GetTabCompletionContent.js'
      )
    case TagName.Script:
      return import(
        '../GetTabCompletionContentScript/GetTabCompletionContentScript.js'
      )
    default:
      return import(
        '../GetTabCompletionContentHtml/GetTabCompletionContentHtml.js'
      )
  }
}

export const getTabCompletion = async (
  text,
  tokens,
  index,
  offset,
  wordAtOffset
) => {
  Assert.string(text)
  Assert.array(tokens)
  Assert.number(index)
  Assert.number(offset)
  const { startTagIndex, startTag, endTagIndex } =
    GetEmbeddedContent.getEmbeddedContent(tokens, index)
  const embeddedContent = text.slice(startTagIndex, endTagIndex)
  const completionsRelativeIndex = offset - startTagIndex
  const module = await getModule(startTag)
  return module.getTabCompletion(
    embeddedContent,
    completionsRelativeIndex,
    wordAtOffset
  )
}
