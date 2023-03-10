import * as TypeScriptPath from '../TypeScriptPath/TypeScriptPath.js'

const typescriptPath = TypeScriptPath.getTypeScriptPath()

const typeScriptModule = await import(typescriptPath)

if (!typeScriptModule.ts) {
  throw new Error(`from typescript module is missing ts export`)
}

const { ts } = typeScriptModule

export const ScriptKind = ts.ScriptKind

export const ScriptTarget = ts.ScriptTarget

export const ModuleResolutionKind = ts.ModuleResolutionKind

export const createLanguageService = ts.createLanguageService

export const ScriptSnapshot = ts.ScriptSnapshot
