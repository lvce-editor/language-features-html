import * as TokenType from '../CssTokenType/CssTokenType.js'

const State = {
  TopLevelContent: 1,
  AfterSelector: 2,
  InsideSelector: 3,
  AfterPropertyName: 4,
  AfterPropertyNameAfterColon: 5,
  AfterPropertyValue: 6,
}

const RE_SELECTOR = /^[\.a-zA-Z\d]+/
const RE_WHITESPACE = /^\s+/
const RE_CURLY_OPEN = /^{/
const RE_CURLY_CLOSE = /^}/
const RE_PROPERTY_NAME = /^[a-zA-Z\-\d]+/
const RE_COLON = /^:/
const RE_PROPERTY_VALUE = /^[^\n;]+/
const RE_SEMICOLON = /^;/
const RE_WHITESPACE_NEWLINE = /^\n/

/**
 * @param {string} text
 */
export const tokenizeCss = (text) => {
  let next
  let index = 0
  let token
  let state = State.TopLevelContent
  const tokens = []
  while (index < text.length) {
    state
    switch (state) {
      case State.TopLevelContent:
        if ((next = text.slice(index).match(RE_SELECTOR))) {
          token = TokenType.Selector
          state = State.AfterSelector
        } else if ((next = text.slice(index).match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.AfterSelector:
        if ((next = text.slice(index).match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterSelector
        } else if ((next = text.slice(index).match(RE_CURLY_OPEN))) {
          token = TokenType.CurlyOpen
          state = State.InsideSelector
        } else {
          text.slice(index) // ?
          throw new Error('no')
        }
        break
      case State.InsideSelector:
        if ((next = text.slice(index).match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.InsideSelector
        } else if ((next = text.slice(index).match(RE_PROPERTY_NAME))) {
          token = TokenType.PropertyName
          state = State.AfterPropertyName
        } else if ((next = text.slice(index).match(RE_CURLY_CLOSE))) {
          token = TokenType.CurlyClose
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.AfterPropertyName:
        if ((next = text.slice(index).match(RE_COLON))) {
          token = TokenType.PropertyColon
          state = State.AfterPropertyNameAfterColon
        } else if ((next = text.slice(index).match(RE_WHITESPACE_NEWLINE))) {
          token = TokenType.Whitespace
          state = State.InsideSelector
        } else if ((next = text.slice(index).match(RE_CURLY_CLOSE))) {
          token = TokenType.CurlyClose
          state = State.TopLevelContent
        } else if ((next = text.slice(index).match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterPropertyName
        } else {
          text.slice(index) // ?
          throw new Error('no')
        }
        break

      case State.AfterPropertyNameAfterColon:
        if ((next = text.slice(index).match(RE_PROPERTY_VALUE))) {
          token = TokenType.PropertyValue
          state = State.AfterPropertyValue
        } else {
          throw new Error('no')
        }
        break
      case State.AfterPropertyValue:
        if ((next = text.slice(index).match(RE_SEMICOLON))) {
          token = TokenType.PropertySemicolon
          state = State.InsideSelector
        } else if ((next = text.slice(index).match(RE_WHITESPACE_NEWLINE))) {
          token = TokenType.Whitespace
          state = State.InsideSelector
        } else {
          throw new Error('no')
        }
        break
      default:
        throw new Error('no')
    }

    index += next[0].length
    tokens.push({ type: token, offset: index })
  }
  return tokens
}

/**
 * @param {any[]} tokens
 * @param {number} offset
 * @returns {any}
 */
export const getTokenAtOffset = (tokens, offset) => {
  // TODO binary search
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.offset >= offset) {
      if (token.offset === offset) {
        return token
      }
      return tokens[i - 1]
    }
  }
  return tokens[tokens.length - 1]
}
