import tokens from './tokens'
import { FarmConfig } from '../types'

const farms: FarmConfig[] = [

  {
    pid: 0,
    lpSymbol: 'MAKI',
    lpAddresses: {
      369: '0x10cf8b3d748a38f6f2063e8a30f44c9d674e4fe2',
      943: '0xcf678682b56a65ccdefe70cd5202ddb40ae25658',
    },
    token: tokens.maki,
    quoteToken: tokens.wpls,
  },

  {
    pid: 1,
    lpSymbol: 'MAKI-PLS',
    lpAddresses: {
      369: '0xd970cd1aebd9d194618c6fef7e9c24676f632312',
      943: '0x755a93cc340a854bb296c015267fc86159170c9e',
    },
    token: tokens.maki,
    quoteToken: tokens.wpls,
  },

  {
    pid: 2,
    lpSymbol: 'MAKI-USDT',
    lpAddresses: {
      369: '0x605a4cc6f8abd7a2d8b10b34258080bfb7a6ae37',
      943: '0x3fd2dc6c684d5f5ff2c1185504283b4fd2d729b9',
    },
    token: tokens.maki,
    quoteToken: tokens.usdt,
  },

  {
    pid: 3,
    lpSymbol: 'USDT-PLS',
    lpAddresses: {
      369: '0xae54d1debbd1e4d86c00171ad7a79dde3e39b65a',
      943: '0x28ce0a51391c1f992946fbf578955ed5dc4d3c11',
    },
    token: tokens.wpls,
    quoteToken: tokens.usdt,
  }

]

export default farms
