import tokens from './tokens'
import { FarmConfig } from '../types'

const priceHelperLps: FarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absense of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
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
]

export default priceHelperLps
