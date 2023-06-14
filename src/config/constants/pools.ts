import tokens from './tokens'
import { PoolConfig, PoolCategory } from '../types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.maki,
    earningToken: tokens.maki,
    contractAddress: { // MASTERCHEF
      369: '0xcCcfC0a7cf56fEC62F971BE98Db29EB0641FdDCE',
      943: '0xcCcfC0a7cf56fEC62F971BE98Db29EB0641FdDCE'
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '16',
    sortOrder: 1,
    isFinished: false,
  },
]

export default pools