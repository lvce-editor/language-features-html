import * as GetEndTag from '../GetEndTag/GetEndTag.js'
import * as GetStartTag from '../GetStartTag/GetStartTag.js'

export const getEmbeddedContent = (tokens, index) => {
  const { startTagIndex, startTag } = GetStartTag.getStartTag(tokens, index)
  const { endTagIndex, endTag } = GetEndTag.getEndTag(tokens, index)
  return {
    startTagIndex,
    startTag,
    endTagIndex,
    endTag,
  }
}
