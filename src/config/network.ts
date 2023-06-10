import { ChainId } from 'maki-pulsechain-sdk'

export const networkRPC: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_NETWORK_RPC,
  [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_NETWORK_RPC
}

export const networkName: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_NETWORK_NAME,
  [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_NETWORK_NAME
}