import { WPLS } from 'maki-pulsechain-sdk'
import { Address } from 'config/types'
import { routerAddr, limitAddr, multicallAddr, makiAddr, soyAddr, masterChefAddr, sousChefAddr, makiVaultAddr, makiProfileAddr, bunnyFactoryAddr, bunnySpecialAddr, claimRefundAddr, pointCenterIfoAddr, BASE_CHAIN_ID, scanUrl, networkRPC, networkName, bridgeSenderAddr } from 'config'

export const getAddress = (address: Address): string => {
  return address[BASE_CHAIN_ID]
}


export const getScanUrl = () => {
  return getAddress(scanUrl);
}

export const getScanUrlWithAddr = (data: string, type: 'transaction' | 'token' | 'address') => {
  const prefix = getAddress(scanUrl)
  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

export const getNetworkRPC = () => {
  return getAddress(networkRPC);
}

export const getNetworkName = () => {
  return getAddress(networkName);
}



// Native
export const getNativeAddress = () => {
  return WPLS[BASE_CHAIN_ID].address;
}

// Contracts
export const getRouterAddress = () => {
  return getAddress(routerAddr);
}

export const getLimitAddress = () => {
  return getAddress(limitAddr);
}

export const getMulticallAddress = () => {
  return getAddress(multicallAddr)
}

export const getMakiAddress = () => {
  return getAddress(makiAddr)
}

export const getSoyAddress = () => {
  return getAddress(soyAddr)
}

export const getMasterChefAddress = () => {
  return getAddress(masterChefAddr)
}

export const getSousChefAddress = () => {
  return getAddress(sousChefAddr)
}

// Awaiting Implementation
export const getMakiVaultAddress = () => {
  return getAddress(makiVaultAddr)
}

export const getProfileAddress = () => {
  return getAddress(makiProfileAddr)
}

export const getBunnyFactoryAddress = () => {
  return getAddress(bunnyFactoryAddr)
}

export const getBunnySpecialAddress = () => {
  return getAddress(bunnySpecialAddr)
}

export const getClaimRefundAddress = () => {
  return getAddress(claimRefundAddr)
}

export const getPointCenterIfoAddress = () => {
  return getAddress(pointCenterIfoAddr)
}

export const getBridgeSenderAddress = () => {
  return getAddress(bridgeSenderAddr)
}
