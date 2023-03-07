// based on https://github.com/emmetio/emmet/blob/e8227d2c3a7d150001f095d49d84ee12cdae8d96/test/lorem.ts by emmetio (License MIT)

/**
 * Returns random integer between <code>from</code> and <code>to</code> values
 */
const rand = (from, to) => {
  return Math.floor(Math.random() * (to - from) + from)
}

const sample = (arr, count) => {
  const len = arr.length
  const iterations = Math.min(len, count)
  const result = []

  while (result.length < iterations) {
    const str = arr[rand(0, len)]
    if (!result.includes(str)) {
      result.push(str)
    }
  }

  return result
}

const choice = (val) => {
  return val[rand(0, val.length - 1)]
}

const sentence = (words, end) => {
  if (words.length) {
    words = [capitalize(words[0])].concat(words.slice(1))
  }

  return words.join(' ') + (end || choice('?!...')) // more dots than question marks
}

const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1)
}

/**
 * Insert commas at randomly selected words. This function modifies values
 * inside `words` array
 */
const insertCommas = (words) => {
  if (words.length < 2) {
    return words
  }

  words = words.slice()
  const len = words.length
  const hasComma = /,$/
  let totalCommas = 0

  if (len > 3 && len <= 6) {
    totalCommas = rand(0, 1)
  } else if (len > 6 && len <= 12) {
    totalCommas = rand(0, 2)
  } else {
    totalCommas = rand(1, 4)
  }

  for (let i = 0, pos; i < totalCommas; i++) {
    pos = rand(0, len - 2)
    if (!hasComma.test(words[pos])) {
      words[pos] += ','
    }
  }

  return words
}

/**
 * Generate a paragraph of "Lorem ipsum" text
 * @param dict Words dictionary
 * @param wordCount Words count in paragraph
 * @param startWithCommon Should paragraph start with common "lorem ipsum" sentence.
 */
export const paragraph = (dict, wordCount, startWithCommon) => {
  const result = []
  let totalWords = 0
  let words

  if (startWithCommon && dict.common) {
    words = dict.common.slice(0, wordCount)
    totalWords += words.length
    result.push(sentence(insertCommas(words), '.'))
  }

  while (totalWords < wordCount) {
    words = sample(dict.words, Math.min(rand(2, 30), wordCount - totalWords))
    totalWords += words.length
    result.push(sentence(insertCommas(words)))
  }

  return result.join(' ')
}
