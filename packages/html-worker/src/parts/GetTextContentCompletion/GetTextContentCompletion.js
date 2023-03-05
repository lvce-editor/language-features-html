import * as GetEmbeddedContent from '../GetEmbeddedContent/GetEmbeddedContent.js'
import * as GetTextContentCompletionScript from '../GetTextContentCompletionScript/GetTextContentCompletionScript.js'
import * as GetTextContentCompletionStyle from '../GetTextContentCompletionStyle/GetTextContentCompletionStyle.js'
import * as TagName from '../TagName/TagName.js'

export const getTextContentCompletion = (text, tokens, index, offset) => {
  const { startTagIndex, startTag, endTagIndex } =
    GetEmbeddedContent.getEmbeddedContent(tokens, index)
  const embeddedContent = text.slice(startTagIndex, endTagIndex)
  const completionsRelativeIndex = offset - startTagIndex
  switch (startTag) {
    case TagName.Script:
      return GetTextContentCompletionScript.getTextContentCompletionScript()
    case TagName.Style:
      return GetTextContentCompletionStyle.getTextContentCompletionStyle(
        embeddedContent,
        completionsRelativeIndex
      )
    default:
      return []
  }
}
