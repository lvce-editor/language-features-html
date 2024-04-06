import { parseHtml } from '../src/parse/ParseHtml.js'
import {test, expect} from '@jest/globals'

const toJSON = (node) => ({
  tag: node.tag,
  start: node.start,
  end: node.end,
  closed: node.closed,
  children: node.children.map(toJSON),
})

const expectParseHtml = (html) => ({
  toEqual(expectedDocument) {
    expect(parseHtml(html).children.map(toJSON)).toEqual(expectedDocument)
  },
})

test('parsing tag', () => {
  expectParseHtml('<h1></h1>').toEqual([
    {
      tag: 'h1',
      children: [],
      closed: true,
      end: 6,
      start: 0,
    },
  ])
  expectParseHtml('<h1>hello world</h1>').toEqual([
    {
      tag: 'h1',
      children: [],
      closed: true,
      end: 17,
      start: 0,
    },
  ])
})

test('self close', () => {
  expectParseHtml('<br />').toEqual([
    {
      tag: 'br',
      children: [],
      start: 0,
      end: 6,
      closed: false,
    },
  ])
})

test('multiple nodes', () => {
  expectParseHtml(`<div></div>
<div></div>`).toEqual([
    {
      tag: 'div',
      children: [],
      start: 0,
      end: 7,
      closed: true,
    },
    {
      tag: 'div',
      children: [],
      start: 12,
      end: 19,
      closed: true,
    },
  ])
})
