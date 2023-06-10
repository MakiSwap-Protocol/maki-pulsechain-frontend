import tokens from './tokens'
import { PoolConfig, PoolCategory } from '../types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.maki,
    earningToken: tokens.maki,
    contractAddress: { // MASTERCHEF
      369: '0x773D596754637405E37b652873F938e0Ac7EDFB8',
      943: '0x773D596754637405E37b652873F938e0Ac7EDFB8'
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '16',
    sortOrder: 1,
    isFinished: false,
  },
]

export default pools