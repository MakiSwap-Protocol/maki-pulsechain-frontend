import tokens from './tokens'
import { FarmConfig } from '../types'

const farms: FarmConfig[] = [

  {
    pid: 0,
    lpSymbol: 'MAKI',
    lpAddresses: {
      369: '',
      943: '0xcF678682b56a65CcdeFe70Cd5202Ddb40Ae25658',
    },
    token: tokens.maki,
    quoteToken: tokens.wpls,
  },

  {
    pid: 1,
    lpSymbol: 'MAKI-PLS',
    lpAddresses: {
      369: '',
      943: '0x755a93Cc340a854Bb296C015267fc86159170C9E',
    },
    token: tokens.maki,
    quoteToken: tokens.wpls,
  },

  {
    pid: 2,
    lpSymbol: 'MAKI-USDT',
    lpAddresses: {
      369: '',
      943: '0x3fd2DC6C684d5F5Ff2C1185504283b4fd2D729b9',
    },
    token: tokens.maki,
    quoteToken: tokens.usdt,
  },

  {
    pid: 3,
    lpSymbol: 'USDT-PLS',
    lpAddresses: {
      369: '',
      943: '0x28ce0a51391c1F992946fBf578955ED5dc4d3c11',
    },
    token: tokens.usdt,
    quoteToken: tokens.wpls,
  }

]

export default farms
