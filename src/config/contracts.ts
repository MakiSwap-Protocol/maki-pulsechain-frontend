import { ChainId } from 'maki-pulsechain-sdk'

export const routerAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_ROUTER,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_ROUTER
  }
  
  export const limitAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_LIMIT,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_LIMIT
  }
  
  export const multicallAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_MULTICALL,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_MULTICALL
  }
  
  export const makiAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_MAKI,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_MAKI
  }
  
  export const soyAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_SOY,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_SOY
  }
  
  export const masterChefAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_MASTERCHEF,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_MASTERCHEF
  }
  
  export const sousChefAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_SOUSCHEF,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_SOUSCHEF
  }
  
  export const makiVaultAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_MAKIVAULT,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_MAKIVAULT
  }
  
  export const makiProfileAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_MAKIPROFILE,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_MAKIPROFILE
  }
  
  export const bunnyFactoryAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_BUNNYFACTORY,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_BUNNYFACTORY
  }
  
  export const bunnySpecialAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_BUNNYSPECIAL,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_BUNNYSPECIAL
  }
  
  export const claimRefundAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_CLAIMREFUND,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_CLAIMREFUND
  }
  
  export const pointCenterIfoAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_IFO,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_IFO
  }

  export const bridgeSenderAddr: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: process.env.REACT_APP_MAINNET_CONTRACT_BRIDGE_SENDER,
    [ChainId.TESTNET]: process.env.REACT_APP_TESTNET_CONTRACT_BRIDGE_SENDER
  }