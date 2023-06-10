import { useMemo } from 'react'
import { AbiItem } from 'web3-utils'
import { Contract } from '@ethersproject/contracts'
import { ChainId, WPLS } from 'maki-pulsechain-sdk'
// import Merkle from 'config/constants/merkle'
import { getContract } from 'utils'

// ABIs
import { abi as IMakiswapPairABI } from 'makiswap-core/build/IMakiswapPair.json'
import ERC20_ABI from 'config/abi/erc20.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefPls from 'config/abi/sousChefPls.json'
import makiVault from 'config/abi/makiVault.json'
// import profile from 'config/abi/pancakeProfile.json'
// import lottery from 'config/abi/lottery.json'
// import lotteryTicket from 'config/abi/lotteryNft.json'
import ENS_ABI from 'config/abi/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from 'config/abi/ens-public-resolver.json'
import { ERC20_BYTES32_ABI } from 'config/abi/erc20'
import WPLS_ABI from 'config/abi/wpls.json'
// import { MIGRATOR_ABI, MIGRATOR_ADDRESS } from 'config/abi/migrator'
import { LIMIT_ABI, MULTICALL_ABI } from 'config/abi'
// Addresses
import {
  getAddress,
  getMasterChefAddress,
  getMakiAddress,
  getMakiVaultAddress,
  getProfileAddress,
  getLimitAddress,
  getMulticallAddress,
  // getLotteryAddress,
} from 'utils/configHelpers'
import { poolsConfig } from 'config'
import { PoolCategory } from 'config/types'
import { useActiveWeb3React } from '.'

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useLimitContract(): Contract | null {
  const contract = useContract(getLimitAddress(), LIMIT_ABI, true);
  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */
export const useERC20 = (address: string) => {
  const erc20Abi = (ERC20_ABI as unknown) as AbiItem
  return useContract(address, erc20Abi)
}

export const useMaki = () => {
  return useERC20(getMakiAddress())
}

export const useMasterchef = () => {
  const abi = (masterChef as unknown) as AbiItem
  return useContract(getMasterChefAddress(), abi)
}

export const useSousChef = (id) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const rawAbi = config.poolCategory === PoolCategory.PLS ? sousChefPls : sousChef
  const abi = (rawAbi as unknown) as AbiItem
  return useContract(getAddress(config.contractAddress), abi)
}

// FIX ** NEED TO ADD
export const useMakiVaultContract = () => {
  const abi = (makiVault as unknown) as AbiItem
  return useContract(getMakiVaultAddress(), abi)
}

// Pancake
// export const useIfoContract = (address: string) => {
//   const ifoAbi = (erc20 as unknown) as AbiItem
//   return useContract(ifoAbi, address)
// }

// export const useBunnyFactory = () => {
//   const bunnyFactoryAbi = (erc20 as unknown) as AbiItem
//   return useContract(bunnyFactoryAbi, getMakiAddress())
// }

// export const usePancakeRabbits = () => {
//   const pancakeRabbitsAbi = (erc20 as unknown) as AbiItem
//   return useContract(pancakeRabbitsAbi, getMakiAddress())
// }

// export const useProfile = () => {
//   const abi = (profile as unknown) as AbiItem
//   return useContract(getProfileAddress(), abi)
// }

// export const useLottery = () => {
//   const abi = (lottery as unknown) as AbiItem
//   return useContract(getLotteryAddress(), abi)
// }

// export const useLotteryTicket = () => {
//   const abi = (lotteryTicket as unknown) as AbiItem
//   return useContract(getLotteryAddress(), abi) // UPDATE get()
// }

// export function useV2MigratorContract(): Contract | null {
//   return useContract(MIGRATOR_ADDRESS, MIGRATOR_ABI, true)
// }

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWPLSContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WPLS[chainId].address : undefined, WPLS_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  let address: string | undefined
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
      // case ChainId.TESTNET:
        break
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IMakiswapPairABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  return useContract(getMulticallAddress(), MULTICALL_ABI, false)
}

// export const useMerkleDistributorContract = () => {
//   return useContract(Merkle.contractAddress, Merkle.contractABI)
// }

export default useContract
