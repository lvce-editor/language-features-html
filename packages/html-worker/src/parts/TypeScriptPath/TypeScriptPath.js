export const getTypeScriptPath = () => {
  return '../../../../../node_modules/typescript/lib/typescript.js'
}

export const getLibFilePath = (libFileName) => {
  return new URL(
    `../../../../../node_modules/typescript/lib/${libFileName}`,
    import.meta.url
  ).toString()
}
