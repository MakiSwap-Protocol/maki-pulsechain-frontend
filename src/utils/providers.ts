import { ethers } from 'ethers'
import { getNetworkRPC } from './configHelpers'

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(getNetworkRPC())

export default null