import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// import { WalletLinkConnector } from '@web3-react/walletlink-connector'
// import { PortisConnector } from '@web3-react/portis-connector'

import { BASE_CHAIN_ID } from 'config'
import { getNetworkRPC } from 'utils/configHelpers'
import { ChainId } from 'maki-pulsechain-sdk'

// import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'
// import { BscConnector } from './bsc/bscConnector'


export const network = new NetworkConnector({
  urls: { [BASE_CHAIN_ID]: getNetworkRPC() },
  defaultChainId: BASE_CHAIN_ID
})

let networkLibrary: Web3Provider | undefined

export function getNetworkLibrary(): Web3Provider {
  // eslint-disable-next-line no-return-assign
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [ChainId.MAINNET, ChainId.TESTNET],
})

// export const bsc = new BscConnector({ supportedChainIds: [ChainId.MAINNET, ChainId.TESTNET] })

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { [BASE_CHAIN_ID]: getNetworkRPC() },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
})

// mainnet only
// export const fortmatic = new FortmaticConnector({
//   apiKey: BASE_FORTPLS_KEY ?? '',
//   chainId: BASE_CHAIN_ID,
// })

// mainnet only
// export const portis = new PortisConnector({
//   dAppId: BASE_PORTIS_KEY ?? '',
//   networks: [BASE_CHAIN_ID],
// })

// mainnet only
// export const walletlink = new WalletLinkConnector({
//   url: getNetworkRPC(),
//   appName: 'MakiSwap',
//   appLogoUrl:
//     'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg',
// })
