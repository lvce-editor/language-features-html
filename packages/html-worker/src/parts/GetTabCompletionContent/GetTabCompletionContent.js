import * as Assert from '../Assert/Assert.js'
import * as GetEmbeddedContent from '../GetEmbeddedContent/GetEmbeddedContent.js'
import * as GetTabCompletionContentHtml from '../GetTabCompletionContentHtml/GetTabCompletionContentHtml.js'
import * as GetTabCompletionContentScript from '../GetTabCompletionContentScript/GetTabCompletionContentScript.js'
import * as GetTabCompletionContentStyle from '../GetTabCompletionContentStyle/GetTabCompletionContent.js'
import * as TagName from '../TagName/TagName.js'

export const getTabCompletion = (text, tokens, index, offset, wordAtOffset) => {
  Assert.string(text)
  Assert.array(tokens)
  Assert.number(index)
  Assert.number(offset)
  const { startTagIndex, startTag, endTagIndex } =
    GetEmbeddedContent.getEmbeddedContent(tokens, index)
  const embeddedContent = text.slice(startTagIndex, endTagIndex)
  const completionsRelativeIndex = offset - startTagIndex
  switch (startTag) {
    case TagName.Style:
      return GetTabCompletionContentStyle.getTabCompletionContent(
        embeddedContent,
        completionsRelativeIndex
      )
    case TagName.Script:
      return GetTabCompletionContentScript.getTabCompletion(
        embeddedContent,
        completionsRelativeIndex
      )
    default:
      return GetTabCompletionContentHtml.getTabCompletion(wordAtOffset)
  }
}
