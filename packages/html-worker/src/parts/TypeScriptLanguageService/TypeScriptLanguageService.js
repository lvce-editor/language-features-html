import * as TypeScript from '../TypeScript/TypeScript.js'
import * as TypeScriptScriptTarget from '../TypeScriptScriptTarget/TypeScriptScriptTarget.js'
import * as TypeScriptModuleResolutionKind from '../TypeScriptModuleResolutionKind/TypeScriptModuleResolutionKind.js'

const getLanguageServiceHost = () => {
  return {
    uri: '',
    content: '',
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
    getScriptKind() {
      throw new Error('not implemented')
    },
    getScriptVersion() {
      throw new Error('not implemented')
    },
    getScriptSnapshot(fileName) {
      if (fileName === this.uri) {
        return this.content
      }
      console.log({ fileName })
      throw new Error('not implemented')
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

export const getLanguageService = (uri) => {
  const host = getLanguageServiceHost()
  host.uri = uri
  const languageService = TypeScript.createLanguageService(host)
  return languageService
}
