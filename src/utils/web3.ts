import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { getNetworkRPC } from './configHelpers'

const httpProvider = new Web3.providers.HttpProvider(getNetworkRPC(), { timeout: 10000 } as HttpProviderOptions)
const web3NoAccount = new Web3(httpProvider)

// const archivedHttpProvider = new Web3.providers.HttpProvider(ARCHIVED_NODE, { timeout: 10000 } as HttpProviderOptions)
// export const web3WithArchivedNodeProvider = new Web3(archivedHttpProvider)

export default web3NoAccount
