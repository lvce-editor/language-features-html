export const getTextSync = (url) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, false)
  xhr.setRequestHeader('Accept', 'text/plain')
  xhr.send(null)
  if (xhr.status !== 200) {
    throw new Error(`Failed to request ${url}: Status ${xhr.status}`)
  }
  return xhr.responseText
}
