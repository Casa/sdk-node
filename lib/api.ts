export const API_ORIGIN = 'https://connect.keys.casa'

export interface ApiOptions {
  token: string
  testnet?: boolean
  origin?: string
}

type ApiErrorCode = 'AUTH_MISSING' | 'AUTH_INVALID'

export class ApiError extends Error {
  status: number
  code: ApiErrorCode
  message: string

  constructor({
    status,
    code,
    message,
  }: {
    status: number
    code: ApiErrorCode
    message: string
  }) {
    super(message)
    this.name = this.constructor.name
    this.status = status
    this.code = code
    this.message = message
  }
}
