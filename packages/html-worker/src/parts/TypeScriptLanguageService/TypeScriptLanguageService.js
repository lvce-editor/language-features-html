import * as TypeScript from '../TypeScript/TypeScript.js'
import * as TypeScriptScriptTarget from '../TypeScriptScriptTarget/TypeScriptScriptTarget.js'
import * as TypeScriptModuleResolutionKind from '../TypeScriptModuleResolutionKind/TypeScriptModuleResolutionKind.js'
import * as TypeScriptPath from '../TypeScriptPath/TypeScriptPath.js'
import * as GetTextSync from '../GetTextSync/GetTextSync.js'
import * as TypeScriptScriptKind from '../TypeScriptScriptKind/TypeScriptScriptKind.js'
import * as TypeScriptScriptSnapshot from '../TypeScriptScriptSnapShot/TypeScriptScriptSnapshot.js'

const getLanguageServiceHost = () => {
  return {
    uri: '',
    content: 'let x = 1',
    scriptKind: TypeScriptScriptKind.Js,
    compilerOptions: {
      allowNonTsExtensions: true,
      allowJs: true,
      lib: ['lib.es2020.full.d.ts'],
      target: TypeScriptScriptTarget.Latest,
      moduleResolution: TypeScriptModuleResolutionKind.Classic,
      experimentalDecorators: false,
    },
    getCompilationSettings() {
      return this.compilerOptions
    },
    getScriptFileNames() {
      return [this.uri]
    },
    getScriptKind(fileName) {
      if (fileName === this.uri) {
        return this.scriptKind
      }
      if (fileName.endsWith('.ts')) {
        return TypeScriptScriptKind.Ts
      }
      return TypeScriptScriptKind.Js
    },
    getScriptVersion() {
      return '1'
    },
    getScriptSnapshot(fileName) {
      if (fileName === this.uri) {
        return TypeScriptScriptSnapshot.fromString(this.content)
      }
      const libFilePath = TypeScriptPath.getLibFilePath(fileName)
      const text = GetTextSync.getTextSync(libFilePath)
      return TypeScriptScriptSnapshot.fromString(text)
    },
    getCurrentDirectory() {
      return ''
    },
    getDefaultLibFileName() {
      return 'es2020.full'
    },
    readFile(path) {
      throw new Error('not implemented')
    },
    fileExists(path) {
      throw new Error('not implemented')
    },
    directoryExists(path) {
      if (path.startsWith('node_modules')) {
        return false
      }
      console.log({ path })
      throw new Error('not implemented')
    },
  }
}

export const getLanguageService = () => {
  const host = getLanguageServiceHost()
  const languageService = TypeScript.createLanguageService(host)
  return { languageService, host }
}
