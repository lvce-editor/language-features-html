import * as GetStartTag from '../GetStartTag/GetStartTag.js'
import * as GetTextContentCompletionScript from '../GetTextContentCompletionScript/GetTextContentCompletionScript.js'
import * as GetTextContentCompletionStyle from '../GetTextContentCompletionStyle/GetTextContentCompletionStyle.js'
import * as TagName from '../TagName/TagName.js'

export const getTextContentCompletion = (tokens, index) => {
  const startTag = GetStartTag.getStartTag(tokens, index)
  switch (startTag) {
    case TagName.Script:
      return GetTextContentCompletionScript.getTextContentCompletionScript()
    case TagName.Style:
      return GetTextContentCompletionStyle.getTextContentCompletionStyle()
    default:
      return []
  }
}
