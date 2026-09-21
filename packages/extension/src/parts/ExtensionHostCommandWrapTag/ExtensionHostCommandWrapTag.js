import { executeCommand } from '@lvce-editor/api'
import * as HtmlWorker from '../HtmlWorker/HtmlWorker.js'
import * as HtmlWorkerCommandType from '../HtmlWorkerCommandType/HtmlWorkerCommandType.js'

export const id = 'html.wrapTag'

const splitLines = (text) => text.split('\n')

const positionAt = (text, offset) => {
  const lines = splitLines(text)
  let rowIndex = 0
  let currentOffset = 0
  while (rowIndex < lines.length && currentOffset + lines[rowIndex].length < offset) {
    currentOffset += lines[rowIndex].length + 1
    rowIndex++
  }
  return {
    columnIndex: offset - currentOffset,
    rowIndex,
  }
}

const offsetAt = (text, rowIndex, columnIndex) => {
  const lines = splitLines(text)
  return lines.slice(0, rowIndex).reduce((offset, line) => offset + line.length + 1, 0) + columnIndex
}

export const execute = async () => {
  const editorId = await executeCommand('GetActiveEditor.getActiveEditorId')
  if (typeof editorId !== 'number' || editorId < 0) {
    return
  }
  const document = /** @type {{text: string} | undefined} */ (await executeCommand('GetActiveEditor.getTextDocument'))
  const selections = await executeCommand('GetActiveEditor.getSelections')
  if (!document || typeof document.text !== 'string' || !selections) {
    return
  }
  const selectionValues = /** @type {ArrayLike<number>} */ (selections)
  const offsets = []
  for (let i = 0; i + 3 < selectionValues.length; i += 4) {
    offsets.push(
      offsetAt(document.text, selectionValues[i], selectionValues[i + 1]),
      0,
      offsetAt(document.text, selectionValues[i + 2], selectionValues[i + 3]),
      0,
    )
  }
  const rpc = await HtmlWorker.getInstance()
  const result = await rpc.invoke(HtmlWorkerCommandType.WrapTag, document.text, offsets)
  if (!result || result.edits.length === 0) {
    return
  }
  const edits = result.edits.map((edit) => ({
    endOffset: edit.end,
    inserted: edit.inserted,
    startOffset: edit.start,
  }))
  const selectionChanges = new Uint32Array(
    result.selections.flatMap((selection) => {
      const start = positionAt(result.text, selection.start)
      const end = positionAt(result.text, selection.end)
      return [start.rowIndex, start.columnIndex, end.rowIndex, end.columnIndex]
    }),
  )
  await executeCommand('Editor.applyDocumentEdits', edits)
  await executeCommand('GetActiveEditor.setSelections', selectionChanges)
}
