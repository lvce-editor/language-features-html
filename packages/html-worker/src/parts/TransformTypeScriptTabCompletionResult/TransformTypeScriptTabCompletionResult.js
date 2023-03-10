import * as FuzzySearch from '../FuzzySearch/FuzzySearch.js'
import * as FilterItems from '../FilterItems/FilterItems.js'

const getName = (entry) => {
  return entry.name
}

const getNames = (entries) => {
  return entries.map(getName)
}

export const transformTypeScriptTabCompletionResult = (
  tsResult,
  offset,
  word
) => {
  if (!tsResult) {
    return undefined
  }
  const { entries } = tsResult
  if (entries.length === 0) {
    return undefined
  }
  const names = getNames(entries)
  const matches = FilterItems.filterItems(names, word)
  if (matches.length === 0) {
    return undefined
  }
  console.log({ matches })
  const firstMatch = matches[0]
  const edit = {
    offset: offset - word.length,
    inserted: firstMatch,
    deleted: word.length,
    type: /* Snippet */ 2,
  }
  return edit
}
