import * as ImportJson from '../ImportJson/ImportJson.js'
import * as GenerateLoremIpsum from '../GenerateLoremIpsum/GenerateLoremIpsum.js'

const loremIpsum = await ImportJson.importJson('data/lorem-ipsum.json')

const getWordCount = (wordAtOffset) => {
  const wordMatch = wordAtOffset.match(/lorem(\d+)/)
  if (wordMatch) {
    return parseInt(wordMatch[1])
  }
  return 20
}

export const getTabCompletion = (wordAtOffset) => {
  const wordCount = getWordCount(wordAtOffset)
  const text = GenerateLoremIpsum.paragraph(loremIpsum, wordCount, true)
  return {
    inserted: text,
    deleted: wordAtOffset.length,
  }
}
