import * as ImportJson from '../ImportJson/ImportJson.js'

const htmlTags = await ImportJson.importJson('data/html-tags.json')

const toHtmlTagCompletion = (htmlTag) => {
  {
    return { ...htmlTag, kind: /* Property */ 1 }
  }
}

const HTML_TAG_COMPLETIONS = htmlTags.map(toHtmlTagCompletion)

export const getHtmlTagCompletions = () => {
  return HTML_TAG_COMPLETIONS
}
