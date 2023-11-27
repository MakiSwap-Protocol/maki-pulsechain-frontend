import tokens from './tokens'
import { PoolConfig, PoolCategory } from '../types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.maki,
    earningToken: tokens.maki,
    contractAddress: { // MASTERCHEF
      369: '0x08d10a15ba358e558d99ff4186c0d3a4ea6c8121',
      943: '0xcccfc0a7cf56fec62f971be98db29eb0641fddce'
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '16',
    sortOrder: 1,
    isFinished: false,
  },
]

export default pools