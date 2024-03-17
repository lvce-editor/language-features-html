import { startWorker } from './startWorker.ts'

export const testWorker = async ({}) => {
  const invocations = []
  const rpc = {
    invoke(...args) {
      // @ts-ignore
      invocations.push(args)
      throw new Error(`unknown command ${args[0]}`)
    },
  }
  const worker = await startWorker(rpc)
  return {
    execute(...args) {
      // @ts-ignore
      return worker.execute(...args)
    },
    invocations,
  }
}
