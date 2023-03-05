import * as TypeScriptPath from '../TypeScriptPath/TypeScriptPath.js'

const typescriptPath = TypeScriptPath.getTypeScriptPath()
const { ts } = await import(typescriptPath)

export const ScriptKind = ts.ScriptKind

export const ScriptTarget = ts.ScriptTarget

export const ModuleResolutionKind = ts.ModuleResolutionKind

export const createLanguageService = ts.createLanguageService

export const ScriptSnapshot = ts.ScriptSnapshot
