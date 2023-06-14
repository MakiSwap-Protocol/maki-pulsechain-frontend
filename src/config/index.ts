
import BigNumber from 'bignumber.js/bignumber'
import { ChainId, JSBI, Percent, Token, WPLS } from 'maki-pulsechain-sdk'


// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}


BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

// CHAIN ID
export const BASE_CHAIN_ID = Number(process.env.REACT_APP_CHAIN_ID);


// URLS
export const BASE_URL = process.env.REACT_APP_BASE_URL
export const BASE2_URL = process.env.REACT_APP_BASE2_URL
export const BASE_API_PROFILE_URL = process.env.REACT_APP_API_PROFILE

export const BASE_EXCHANGE_URL = BASE_URL
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/pool`


// BIGNUMBERS
export const BIG_ZERO = new BigNumber(0)
export const BIG_ONE = new BigNumber(1)
export const BIG_NINE = new BigNumber(9)
export const BIG_TEN = new BigNumber(10)


// GAS
export const DEFAULT_GAS_LIMIT = 200000
export const DEFAULT_GAS_PRICE = 5
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)


// BLOCKS
export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const MAKI_PER_BLOCK = new BigNumber(16)
export const MAKI_PER_YEAR = MAKI_PER_BLOCK.times(BLOCKS_PER_YEAR)
export const HECO_BLOCK_TIME = 3

export const MAKI_POOL_PID = 0
export const MAKI_PLS_POOL_PID = 1
export const MAKI_USD_POOL_PID = 2
export const USD_PLS_POOL_PID = 3


// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// // used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// // if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// // for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// // used to ensure the user doesn't send so much HT so they end up with <.01
export const MIN_PLS: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 PLS
// export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))


export const USDT_MAIN = new Token(ChainId.MAINNET, '0x3e0Ad60c6D427191D66B6D168ddeF82A66F573B0', 6, 'USDT', 'USDT');
// export const USDC_MAIN = new Token(ChainId.MAINNET, '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', 6, 'USDC', 'USD Coin (PoS)');

export const USDT_TEST = new Token(ChainId.TESTNET, '0x3e0Ad60c6D427191D66B6D168ddeF82A66F573B0', 6, 'USDT', 'USDT')



const WPLS_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WPLS[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WPLS[ChainId.TESTNET]]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WPLS_ONLY,
  [ChainId.MAINNET]: [...WPLS_ONLY[ChainId.MAINNET], USDT_MAIN],
  [ChainId.TESTNET]: [...WPLS_ONLY[ChainId.TESTNET], USDT_TEST],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WPLS_ONLY,
  [ChainId.MAINNET]: [...WPLS_ONLY[ChainId.MAINNET], USDT_MAIN],
  [ChainId.TESTNET]: [...WPLS_ONLY[ChainId.TESTNET], USDT_TEST],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
 export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
  [ChainId.TESTNET]: {},
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, '0xcF678682b56a65CcdeFe70Cd5202Ddb40Ae25658', 18, 'MAKI', 'MakiSwap'),
      WPLS[ChainId.MAINNET]
    ],
  ],
  [ChainId.TESTNET]: [
    [
      new Token(ChainId.TESTNET, '0xcF678682b56a65CcdeFe70Cd5202Ddb40Ae25658', 18, 'MAKI', 'MakiSwap'),
      WPLS[ChainId.TESTNET]
    ],
  ],
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WPLS_ONLY,
  [ChainId.MAINNET]: [...WPLS_ONLY[ChainId.MAINNET], USDT_MAIN],
  [ChainId.TESTNET]: [...WPLS_ONLY[ChainId.TESTNET], USDT_TEST],
}



// exports
export * from './contracts'
export * from './network'
export * from './urls'
export { default as farmsConfig } from './constants/farms'
export { default as poolsConfig } from './constants/pools'

