import tokens from './tokens'
import { FarmConfig } from '../types'

const farms: FarmConfig[] = [

  {
    pid: 0,
    lpSymbol: 'MAKI',
    lpAddresses: {
      369: '',
      943: '0x5B2E31bebdc3A0fE2FD1A2F147e2a99994F22800',
    },
    token: tokens.maki,
    quoteToken: tokens.wpls,
  },

  {
    pid: 1,
    lpSymbol: 'MAKI-PLS',
    lpAddresses: {
      369: '',
      943: '0x4b16160F746C8417E414b5307F1C0B68E5923109',
    },
    token: tokens.maki,
    quoteToken: tokens.wpls,
  },

  {
    pid: 2,
    lpSymbol: 'MAKI-USDT',
    lpAddresses: {
      369: '',
      943: '0x3718388570979c298bdDE7e04CA3De4CF074d895',
    },
    token: tokens.maki,
    quoteToken: tokens.usdt,
  },

  {
    pid: 3,
    lpSymbol: 'USDT-PLS',
    lpAddresses: {
      369: '',
      943: '0x0e5dd43Ca1225bE238285f761dE03F6E25f146b0',
    },
    token: tokens.usdt,
    quoteToken: tokens.wpls,
  }

]

export default farms
