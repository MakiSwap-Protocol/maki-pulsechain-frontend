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
      // 369: '',
      943: '0x3718388570979c298bdDE7e04CA3De4CF074d895',
    },
    token: tokens.maki,
    quoteToken: tokens.usdt,
  },
]

export default priceHelperLps
