const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
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

const getTagEnd = (text, start) => {
  let quote = ''
  for (let i = start + 1; i < text.length; i++) {
    const character = text[i]
    if (quote) {
      if (character === quote) {
        quote = ''
      }
    } else if (character === '"' || character === "'") {
      quote = character
    } else if (character === '>') {
      return i + 1
    }
  }
  return -1
}

const getTags = (text) => {
  const tags = []
  const stack = []
  let index = 0
  while (index < text.length) {
    if (text.startsWith('<!--', index)) {
      const commentEnd = text.indexOf('-->', index + 4)
      index = commentEnd === -1 ? text.length : commentEnd + 3
      continue
    }
    if (text[index] !== '<') {
      index++
      continue
    }
    const end = getTagEnd(text, index)
    if (end === -1) {
      break
    }
    const value = text.slice(index, end)
    const match = value.match(/^<\s*(\/?)\s*([a-zA-Z][\w:.-]*)/)
    if (!match) {
      index = end
      continue
    }
    const [, closing, name] = match
    const tag = {
      end,
      name: name.toLowerCase(),
      start: index,
    }
    if (closing) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].name !== tag.name) {
          continue
        }
        const opening = stack[i]
        opening.closeStart = index
        opening.closeEnd = end
        tags.push(opening)
        stack.splice(i)
        break
      }
    } else if (!VOID_ELEMENTS.has(tag.name) && !/\/\s*>$/.test(value)) {
      stack.push(tag)
    }
    index = end
  }
  return tags
}

const rangesIntersect = (start, end, rangeStart, rangeEnd) => {
  if (start === end) {
    return start >= rangeStart && start <= rangeEnd
  }
  return start < rangeEnd && end > rangeStart
}

const getExpandedRange = (tags, start, end) => {
  const candidates = tags
    .filter((tag) => {
      const containsSelection = tag.start <= start && tag.closeEnd >= end
      const touchesTag =
        rangesIntersect(start, end, tag.start, tag.end) ||
        rangesIntersect(start, end, tag.closeStart, tag.closeEnd)
      return containsSelection && touchesTag
    })
    .sort((a, b) => a.closeEnd - a.start - (b.closeEnd - b.start))
  if (candidates.length > 0) {
    return {
      end: candidates[0].closeEnd,
      start: candidates[0].start,
    }
  }
  return { end, start }
}

const getRanges = (selections) => {
  const ranges = []
  for (let i = 0; i + 3 < selections.length; i += 4) {
    const start = selections[i]
    const end = selections[i + 2]
    const startOffset = Math.min(start, end)
    const endOffset = Math.max(start, end)
    if (startOffset !== endOffset) {
      ranges.push({ end: endOffset, start: startOffset })
    }
  }
  return ranges
}

const getUniqueRanges = (ranges) => {
  const unique = []
  for (const range of ranges) {
    if (!unique.some((candidate) => candidate.start === range.start && candidate.end === range.end)) {
      unique.push(range)
    }
  }
  return unique.sort((a, b) => a.start - b.start || a.end - b.end)
}

const applyEdits = (text, edits) => {
  let result = text
  for (let i = edits.length - 1; i >= 0; i--) {
    const edit = edits[i]
    result = result.slice(0, edit.start) + edit.inserted + result.slice(edit.end)
  }
  return result
}

export const execute = async (text, selections) => {
  const tags = getTags(text)
  const ranges = getUniqueRanges(
    getRanges(selections).map(({ end, start }) => getExpandedRange(tags, start, end)),
  )
  const edits = ranges.map(({ end, start }) => ({
    end,
    inserted: `<div>${text.slice(start, end)}</div>`,
    start,
  }))
  const resultText = applyEdits(text, edits)
  const resultSelections = []
  let offsetDelta = 0
  for (const edit of edits) {
    const start = edit.start + offsetDelta
    const openingEnd = start + '<div>'.length
    const closingStart = openingEnd + edit.end - edit.start
    resultSelections.push(
      { end: openingEnd, start },
      { end: closingStart + '</div>'.length, start: closingStart },
    )
    offsetDelta += edit.inserted.length - (edit.end - edit.start)
  }
  return {
    edits,
    selections: resultSelections,
    text: resultText,
  }
}
