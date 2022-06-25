import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// TODO use import json once supported
const __dirname = dirname(fileURLToPath(import.meta.url))

export const root = join(__dirname, '..', '..', '..')
