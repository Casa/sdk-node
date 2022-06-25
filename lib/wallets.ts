import fetch from 'cross-fetch'

import { API_ORIGIN, ApiOptions } from './api'

export interface Wallet {
  // The wallet's unique ID
  id: string

  // An arbitrary string to name the wallet
  label: string

  // The type of coin that is held by the wallet
  coinType: 'BTC' | 'TBTC'

  // The type of keyset that secures the wallet
  keysetType: 'single-key' | 'basic-multisig' | 'key-shield'

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
  testnet = true,
  origin = API_ORIGIN,
}: ApiOptions) {
  return await fetch(`${origin}/wallets?testnet=${String(testnet)}`, {
    headers: {
      'X-Api-Key': token,
    },
  }).then(response => response.json() as Promise<Wallet[] | null>)
}
