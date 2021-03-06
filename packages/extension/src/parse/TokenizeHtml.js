const State = {
  TopLevelContent: 1,
  AfterOpeningAngleBracket: 2,
  AfterOpeningTagName: 3,
  AfterClosingTagSlash: 4,
  AfterClosingTagName: 5,
  InsideOpeningTagAfterWhitespace: 6,
  AfterAttributeName: 7,
  AfterAttributeEqualSign: 8,
  InsideAttributeAfterDoubleQuote: 9,
  AfterAttributeValueInsideDoubleQuote: 10,
  AfterAttributeValueClosingQuote: 11,
  AfterExclamationMark: 16,
  InsideComment: 17,
}

export const TokenType = {
  None: 0,
  OpeningAngleBracket: 1,
  ClosingAngleBracket: 2,
  TagNameStart: 3,
  TagNameEnd: 4,
  Content: 5,
  ClosingTagSlash: 6,
  WhitespaceInsideOpeningTag: 7,
  AttributeName: 8,
  AttributeEqualSign: 9,
  AttributeQuoteStart: 10,
  AttributeValue: 11,
  AttributeQuoteEnd: 12,
  WhitespaceAfterClosingTagSlash: 13,
  WhitespaceAfterOpeningTagOpenAngleBracket: 14,
  ExclamationMark: 15,
  Doctype: 16,
  StartCommentDashes: 17,
  Comment: 18,
  EndCommentTag: 19,
}

const RE_ANGLE_BRACKET_OPEN = /^</
const RE_ANGLE_BRACKET_CLOSE = /^>/
const RE_SLASH = /^\//
const RE_TAGNAME = /^[a-zA-Z\d$]+/
const RE_CONTENT = /^[^<>]+/
const RE_WHITESPACE = /^\s+/
const RE_ATTRIBUTE_NAME = /^[a-zA-Z\d\-]+/
const RE_EQUAL_SIGN = /^=/
const RE_DOUBLE_QUOTE = /^"/
const RE_ATTRIBUTE_VALUE_INSIDE_DOUBLE_QUOTE = /^[^"\n]+/
const RE_TEXT = /^[^<>]+/
const RE_EXCLAMATION_MARK = /^!/
const RE_DASH_DASH = /^--/
const RE_DOCTYPE = /^doctype/i
const RE_BLOCK_COMMENT_CONTENT = /^[a-zA-Z\s]+/
const RE_COMMENT_END = /^-->/

/**
 * @param {string} text
 */
export const tokenizeHtml = (text) => {
  let state = State.TopLevelContent
  let index = 0
  let next
  const tokens = []
  let token = TokenType.None
  while (index < text.length) {
    switch (state) {
      case State.TopLevelContent:
        if ((next = text.slice(index).match(RE_ANGLE_BRACKET_OPEN))) {
          token = TokenType.OpeningAngleBracket
          state = State.AfterOpeningAngleBracket
        } else if ((next = text.slice(index).match(RE_CONTENT))) {
          token = TokenType.Content
          state = State.TopLevelContent
        } else if ((next = text.slice(index).match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.Content
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.AfterOpeningAngleBracket:
        if ((next = text.slice(index).match(RE_TAGNAME))) {
          token = TokenType.TagNameStart
          state = State.AfterOpeningTagName
        } else if ((next = text.slice(index).match(RE_SLASH))) {
          token = TokenType.ClosingTagSlash
          state = State.AfterClosingTagSlash
        } else if ((next = text.slice(index).match(RE_WHITESPACE))) {
          token = TokenType.WhitespaceAfterOpeningTagOpenAngleBracket
          state = State.TopLevelContent
        } else if ((next = text.slice(index).match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.ClosingAngleBracket
          state = State.TopLevelContent
        } else if ((next = text.slice(index).match(RE_EXCLAMATION_MARK))) {
          token = TokenType.ExclamationMark
          state = State.AfterExclamationMark
        } else {
          text.slice(index) // ?
          throw new Error('no')
        }
        break
      case State.AfterExclamationMark:
        if ((next = text.slice(index).match(RE_DASH_DASH))) {
          token = TokenType.StartCommentDashes
          state = State.InsideComment
        } else if ((next = text.slice(index).match(RE_DOCTYPE))) {
          token = TokenType.Doctype
          state = State.AfterOpeningTagName
        } else {
          text.slice(index) // ?
          throw new Error('no')
        }
        break
      case State.InsideComment:
        if ((next = text.slice(index).match(RE_BLOCK_COMMENT_CONTENT))) {
          token = TokenType.Comment
          state = State.InsideComment
        } else if ((next = text.slice(index).match(RE_COMMENT_END))) {
          token = TokenType.EndCommentTag
          state = State.TopLevelContent
        } else {
          text.slice(index) // ?
          throw new Error('no')
        }
        break
      case State.AfterOpeningTagName:
        if ((next = text.slice(index).match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.ClosingAngleBracket
          state = State.TopLevelContent
        } else if ((next = text.slice(index).match(RE_WHITESPACE))) {
          token = TokenType.WhitespaceInsideOpeningTag
          state = State.InsideOpeningTagAfterWhitespace
        } else {
          throw new Error('no')
        }
        break
      case State.InsideOpeningTagAfterWhitespace:
        if ((next = text.slice(index).match(RE_ATTRIBUTE_NAME))) {
          token = TokenType.AttributeName
          state = State.AfterAttributeName
        } else if ((next = text.slice(index).match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.ClosingAngleBracket
          state = State.TopLevelContent
        } else if ((next = text.slice(index).match(RE_TEXT))) {
          token = TokenType.AttributeName
          state = State.AfterAttributeName
        } else {
          text.slice(index).match(RE_TEXT) // ?
          text.slice(index) // ?
          throw new Error('no')
        }
        break
      case State.AfterAttributeName:
        if ((next = text.slice(index).match(RE_EQUAL_SIGN))) {
          token = TokenType.AttributeEqualSign
          state = State.AfterAttributeEqualSign
        } else if ((next = text.slice(index).match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.ClosingAngleBracket
          state = State.TopLevelContent
        } else if ((next = text.slice(index).match(RE_WHITESPACE))) {
          token = TokenType.WhitespaceInsideOpeningTag
          state = State.InsideOpeningTagAfterWhitespace
        } else if ((next = text.slice(index).match(RE_ANGLE_BRACKET_OPEN))) {
          token = TokenType.OpeningAngleBracket
          state = State.AfterOpeningAngleBracket
        } else {
          text.slice(index) // ?
          throw new Error('no')
        }
        break
      case State.AfterAttributeEqualSign:
        if ((next = text.slice(index).match(RE_DOUBLE_QUOTE))) {
          token = TokenType.AttributeQuoteStart
          state = State.InsideAttributeAfterDoubleQuote
        } else if ((next = text.slice(index).match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.ClosingAngleBracket
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.InsideAttributeAfterDoubleQuote:
        if (
          (next = text
            .slice(index)
            .match(RE_ATTRIBUTE_VALUE_INSIDE_DOUBLE_QUOTE))
        ) {
          token = TokenType.AttributeValue
          state = State.AfterAttributeValueInsideDoubleQuote
        } else if ((next = text.slice(index).match(RE_DOUBLE_QUOTE))) {
          token = TokenType.AttributeQuoteEnd
          state = State.AfterAttributeValueClosingQuote
        } else {
          throw new Error('no')
        }
        break
      case State.AfterAttributeValueInsideDoubleQuote:
        if ((next = text.slice(index).match(RE_DOUBLE_QUOTE))) {
          token = TokenType.AttributeQuoteEnd
          state = State.AfterAttributeValueClosingQuote
        } else {
          throw new Error('no')
        }
        break
      case State.AfterAttributeValueClosingQuote:
        if ((next = text.slice(index).match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.ClosingAngleBracket
          state = State.TopLevelContent
        } else if ((next = text.slice(index).match(RE_WHITESPACE))) {
          token = TokenType.WhitespaceInsideOpeningTag
          state = State.InsideOpeningTagAfterWhitespace
        } else {
          throw new Error('no')
        }
        break
      case State.AfterClosingTagSlash:
        if ((next = text.slice(index).match(RE_TAGNAME))) {
          token = TokenType.TagNameEnd
          state = State.AfterClosingTagName
        } else if ((next = text.slice(index).match(RE_WHITESPACE))) {
          token = TokenType.WhitespaceAfterClosingTagSlash
          state = State.TopLevelContent
        } else if ((next = text.slice(index).match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.ClosingAngleBracket
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.AfterClosingTagName:
        if ((next = text.slice(index).match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.ClosingAngleBracket
          state = State.TopLevelContent
        } else if ((next = text.slice(index).match(RE_WHITESPACE))) {
          token = TokenType.Content
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      default:
        throw new Error('no')
    }
    const tokenText = next[0]
    tokens.push({
      type: token,
      text: tokenText,
      offset: index,
    })
    index += tokenText.length
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

// tokenizeHtml(`<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Document</title>
//   </head>
//   <body>
//     sample test
//   </body>
// </html>`) //?

// tokenizeHtml(`<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Document</title>
//     <address></address>
//     button
// <audio>
//   </head>
//   <body>
//     <!-- sample test

//     -->
//   </body>
// </html>
// `) //?
