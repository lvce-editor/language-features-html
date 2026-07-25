/* eslint-disable unicorn/no-top-level-side-effects */
import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import { commandMap } from './parts/CommandMap/CommandMap.js'

// eslint-disable-next-line unicorn/no-global-object-property-assignment
globalThis.rpc = await WebWorkerRpcClient.create({ commandMap })
