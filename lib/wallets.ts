import fetch from 'cross-fetch'

import { API_ORIGIN, ApiOptions, ApiError } from './api'

export interface Wallet {
  // The wallet's unique ID
  id: string

  // An arbitrary string to name the wallet
  label: string

  // The type of coin that is held by the wallet
  coinType: 'BTC' | 'TBTC'

  // The type of keyset that secures the wallet
  keysetType: 'phone' | 'basic-multisig' | 'key-shield'

  // The current deposit address of the wallet
  currentAddress: string

  // The balance of the coin within the wallet
  balance: CoinBalance
}

interface CoinBalance {
  // The amount of the coin in its native currency
  amount: number

  // // Optional conversion of the coin amount into fiat currencies
  // usd?: number,
  // cad?: number,
}

export async function getWallets({
  token,
  testnet = false,
  origin = API_ORIGIN,
}: ApiOptions) {
  return await fetch(`${origin}/wallets?testnet=${String(testnet)}`, {
    headers: {
      'X-Api-Key': token,
    },
  }).then(async response => {
    if (!response.ok) {
      const error =
        // eslint-disable-next-line no-magic-numbers
        (await response.json()) as ConstructorParameters<typeof ApiError>[0]
      throw new ApiError(error)
    }
    return response.json() as Promise<Wallet[] | null>
  })
}
