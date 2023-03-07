import { getPreviousOpenTag } from '../../parse/getPreviousOpenTag.js'

export const htmlAutoClose = (text, edits) => {
  if (edits.length > 1) {
    console.warn('multiple edits are not yet supported')
    return
  }
  // TODO
  const edit = edits[0]
  const offset = edit.endOffset
  const previousOpenTagName = getPreviousOpenTag(text, offset)
  if (!previousOpenTagName) {
    return undefined
  }
  const outGoingEdit = {
    startOffset: offset + 1,
    inserted: `${previousOpenTagName.tagName}>`,
    deleted: 0,
  }
  return outGoingEdit
}
