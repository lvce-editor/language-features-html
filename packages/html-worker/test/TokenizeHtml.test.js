import { tokenizeHtml } from '../src/parts/TokenizeHtml/TokenizeHtml.js'
import * as TokenType from '../src/parts/TokenType/TokenType.js'

const getType = (token) => {
  return token.type
}

const expectTokenizeHtml = (html) => ({
  toEqual(expectedTokens) {
    expect(tokenizeHtml(html).map(getType)).toEqual(expectedTokens)
  },
})

test('basic tag with text', () => {
  expectTokenizeHtml('<h1>hello world</h1>').toEqual([
    TokenType.OpeningAngleBracket,
    TokenType.TagNameStart,
    TokenType.ClosingAngleBracket,
    TokenType.Content,
    TokenType.OpeningAngleBracket,
    TokenType.ClosingTagSlash,
    TokenType.TagNameEnd,
    TokenType.ClosingAngleBracket,
  ])
})

test('with whitespace after opening tag name', () => {
  expectTokenizeHtml('<h1 >hello world</h1>').toEqual([
    TokenType.OpeningAngleBracket,
    TokenType.TagNameStart,
    TokenType.WhitespaceInsideOpeningTag,
    TokenType.ClosingAngleBracket,
    TokenType.Content,
    TokenType.OpeningAngleBracket,
    TokenType.ClosingTagSlash,
    TokenType.TagNameEnd,
    TokenType.ClosingAngleBracket,
  ])
})

test('stray closing angle bracket', () => {
  expectTokenizeHtml('<h1>hello>world</h1>').toEqual([
    TokenType.OpeningAngleBracket,
    TokenType.TagNameStart,
    TokenType.ClosingAngleBracket,
    TokenType.Content,
    TokenType.Content,
    TokenType.Content,
    TokenType.OpeningAngleBracket,
    TokenType.ClosingTagSlash,
    TokenType.TagNameEnd,
    TokenType.ClosingAngleBracket,
  ])
})

test('invalid html 1', () => {
  expectTokenizeHtml(`<h1>hello<a
world</h1>`).toEqual([
    TokenType.OpeningAngleBracket,
    TokenType.TagNameStart,
    TokenType.ClosingAngleBracket,
    TokenType.Content,
    TokenType.OpeningAngleBracket,
    TokenType.TagNameStart,
    TokenType.WhitespaceInsideOpeningTag,
    TokenType.AttributeName,
    TokenType.OpeningAngleBracket,
    TokenType.ClosingTagSlash,
    TokenType.TagNameEnd,
    TokenType.ClosingAngleBracket,
  ])
})

test('incomplete attribute', () => {
  expectTokenizeHtml('<h1 class=>').toEqual([
    TokenType.OpeningAngleBracket,
    TokenType.TagNameStart,
    TokenType.WhitespaceInsideOpeningTag,
    TokenType.AttributeName,
    TokenType.AttributeEqualSign,
    TokenType.ClosingAngleBracket,
  ])
})

test('unclosed tag', () => {
  expectTokenizeHtml(`<h1></h1
`).toEqual([
    TokenType.OpeningAngleBracket,
    TokenType.TagNameStart,
    TokenType.ClosingAngleBracket,
    TokenType.OpeningAngleBracket,
    TokenType.ClosingTagSlash,
    TokenType.TagNameEnd,
    TokenType.Content,
  ])
})

test('empty opening tag', () => {
  expectTokenizeHtml('<>').toEqual([
    TokenType.OpeningAngleBracket,
    TokenType.ClosingAngleBracket,
  ])
})

test('empty closing tag', () => {
  expectTokenizeHtml('</>').toEqual([
    TokenType.OpeningAngleBracket,
    TokenType.ClosingTagSlash,
    TokenType.ClosingAngleBracket,
  ])
})

test('empty string attribute value', () => {
  expectTokenizeHtml('<h1 class="">').toEqual([
    TokenType.OpeningAngleBracket,
    TokenType.TagNameStart,
    TokenType.WhitespaceInsideOpeningTag,
    TokenType.AttributeName,
    TokenType.AttributeEqualSign,
    TokenType.AttributeQuoteStart,
    TokenType.AttributeQuoteEnd,
    TokenType.ClosingAngleBracket,
  ])
})

test('basic html document', () => {
  expectTokenizeHtml(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    sample test
  </body>
</html>
`)
    // TODO
    .toEqual(expect.any(Array))
})

test('invalid html', () => {
  expectTokenizeHtml(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Docuament</title>
      <address></address>
  <audio>
    </head>
    <body>
      sample<test$0></test> test
      <
    </body>
  </html>
  `).toEqual(expect.any(Array))
})

test('comment', () => {
  expectTokenizeHtml('<!-- -->').toEqual([
    TokenType.CommentStart,
    TokenType.Comment,
    TokenType.EndCommentTag,
  ])
})

test('unfinished comment', () => {
  expectTokenizeHtml('<!-- ').toEqual([
    TokenType.CommentStart,
    TokenType.Comment,
  ])
})

test('multiline comment', () => {
  expectTokenizeHtml(`<!--
   abc -->`).toEqual([
    TokenType.CommentStart,
    TokenType.Comment,
    TokenType.EndCommentTag,
  ])
})

test.skip('doctype', () => {
  expectTokenizeHtml('<!doctype html>').toEqual([])
})

test.skip('bug 27', () => {
  expectTokenizeHtml('<h123></h123/h123>').toEqual([])
})

test.skip('bug 28', () => {
  expectTokenizeHtml('<h1234567 class=></h1234567>').toEqual([])
})

test.skip('invalid html 4', () => {
  expectTokenizeHtml('<<div>></<div>>').toEqual([])
})

test('unexpected opening angle bracket', () => {
  expectTokenizeHtml(`<button<`).toEqual([
    TokenType.OpeningAngleBracket,
    TokenType.TagNameStart,
    TokenType.Text,
  ])
})

test('webpack syntax', () => {
  expectTokenizeHtml(
    `<title><%= htmlWebpackPlugin.options.title %></title>`
  ).toEqual([
    TokenType.OpeningAngleBracket,
    TokenType.TagNameStart,
    TokenType.ClosingAngleBracket,
    TokenType.Text,
    TokenType.Content,
    TokenType.Content,
    TokenType.OpeningAngleBracket,
    TokenType.ClosingTagSlash,
    TokenType.TagNameEnd,
    TokenType.ClosingAngleBracket,
  ])
})

test('attribute without value', () => {
  expectTokenizeHtml(`<a href="/" download></a>`).toEqual([
    TokenType.OpeningAngleBracket,
    TokenType.TagNameStart,
    TokenType.WhitespaceInsideOpeningTag,
    TokenType.AttributeName,
    TokenType.AttributeEqualSign,
    TokenType.AttributeQuoteStart,
    TokenType.AttributeValue,
    TokenType.AttributeQuoteEnd,
    TokenType.WhitespaceInsideOpeningTag,
    TokenType.AttributeName,
    TokenType.ClosingAngleBracket,
    TokenType.OpeningAngleBracket,
    TokenType.ClosingTagSlash,
    TokenType.TagNameEnd,
    TokenType.ClosingAngleBracket,
  ])
})

test('self closing tag', () => {
  expectTokenizeHtml(`<input />`).toEqual([
    TokenType.OpeningAngleBracket,
    TokenType.TagNameStart,
    TokenType.WhitespaceInsideOpeningTag,
    TokenType.ClosingAngleBracket,
  ])
})
