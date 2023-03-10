import * as FuzzySearch from '../FuzzySearch/FuzzySearch.js'

export const filterItems = (items, searchTerm) => {
  const results = []
  for (const item of items) {
    if (FuzzySearch.fuzzySearch(searchTerm, item)) {
      results.push(item)
    }
  }
  return results
}
