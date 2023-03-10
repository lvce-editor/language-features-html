export const getIdTabCompletion = (wordAtOffset) => {
  const id = wordAtOffset.slice(1)
  return {
    inserted: `<div id="${id}"></div>`,
    deleted: wordAtOffset.length,
    type: /* Snippet */ 2,
  }
}
