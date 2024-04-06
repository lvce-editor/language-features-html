// @ts-ignore
import * as Command from '../Command/Command.js'
// @ts-ignore
import * as GetErrorResponse from '../GetErrorResponse/GetErrorResponse.js'
// @ts-ignore
import * as GetSuccessResponse from '../GetSuccessResponse/GetSuccessResponse.js'

export const getResponse = async (message) => {
  try {
    const result = await Command.execute(message.method, ...message.params)
    return GetSuccessResponse.getSuccessResponse(message, result)
  } catch (error) {
    return GetErrorResponse.getErrorResponse(message, error)
  }
}
