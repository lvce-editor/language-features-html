export const getTypeScriptPath = () => {
  return new URL(
    '../../../../../node_modules/typescript/lib/typescript-esm.js',
    import.meta.url,
  ).toString()
}

export const getLibFilePath = (libFileName) => {
  return new URL(
    `../../../../../node_modules/typescript/lib/${libFileName}`,
    import.meta.url,
  ).toString()
}
