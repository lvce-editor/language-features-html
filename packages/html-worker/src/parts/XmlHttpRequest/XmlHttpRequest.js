export const getTextSync = (url) => {
  const request = new XMLHttpRequest()
  request.open('GET', url, false)
  request.send(null)
  if (request.status !== 200) {
    throw new Error(request.statusText)
  }
  return request.responseText
}
