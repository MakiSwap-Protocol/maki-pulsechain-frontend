import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ConnectorNames } from 'maki-toolkit'
import { ethers } from 'ethers'
import { BASE_CHAIN_ID } from 'config'
import { getNetworkRPC } from './configHelpers'

const POLLING_INTERVAL = 12000

const injected = new InjectedConnector({ supportedChainIds: [BASE_CHAIN_ID] })

const walletconnect = new WalletConnectConnector({
  rpc: { [BASE_CHAIN_ID]: getNetworkRPC() },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
}

export const getLibrary = (provider): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}
