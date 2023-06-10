import { ChainId } from 'maki-pulsechain-sdk'

export const scanUrl: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_SCAN_URL,
  [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_SCAN_URL
}

export const m: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '',
  [ChainId.TESTNET]: ''
}