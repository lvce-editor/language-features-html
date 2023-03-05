const getTypeScriptPath = () => {
  return '../../../../../node_modules/typescript/lib/typescript.js'
}
const typescriptPath = getTypeScriptPath()
const { ts } = await import(typescriptPath)

export const ScriptKind = ts.ScriptKind

export const ScriptTarget = ts.ScriptTarget

export const ModuleResolutionKind = ts.ModuleResolutionKind

export const createLanguageService = ts.createLanguageService
