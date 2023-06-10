// Set of helper functions to facilitate wallet setup

import { BASE_CHAIN_ID } from "config"
import { PLS } from "maki-pulsechain-sdk"
import { getNetworkName, getNetworkRPC, getScanUrl } from "./configHelpers"


/**
 * Prompt the user to add HECO as a network on Metamask, or switch to HECO if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  console.log(window);
  const provider = (window as WindowChain).pls
  const { ethereum } = (window as any)
  const chainId = BASE_CHAIN_ID
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: getNetworkName(),
            nativeCurrency: {
              name: PLS.name,
              symbol: PLS.symbol,
              decimals: PLS.decimals,
            },
            rpcUrls: [getNetworkRPC()],
            blockExplorerUrls: [getScanUrl()],
          },
        ],
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  } else if (ethereum) {
    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: getNetworkName(),
            nativeCurrency: {
              name: PLS.name,
              symbol: PLS.symbol,
              decimals: PLS.decimals,
            },
            rpcUrls: [getNetworkRPC()],
            blockExplorerUrls: [getScanUrl()],
          },
        ],
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  } else {
    console.error(`Can't setup the ${PLS.name} network on metamask because window.ethereum is undefined`)
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
 export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string,
) => {
  const tokenAdded = await (window as WindowChain).pls.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  })

  return tokenAdded
}