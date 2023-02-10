export const getHtmlWorkerUrl = () => {
  return new URL(
    '../../../../html-worker/src/htmlWorkerMain.js',
    import.meta.url
  ).toString()
}
