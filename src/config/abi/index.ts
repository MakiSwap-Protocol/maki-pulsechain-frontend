
import { Interface } from '@ethersproject/abi'
import MULTICALL_ABI from './Multicall.json'
import LIMIT_ABI from './limit-order.abi.json'

const LIMIT_INTERFACE = new Interface(LIMIT_ABI)

export {
  MULTICALL_ABI,
  LIMIT_ABI,
  LIMIT_INTERFACE
}
  
