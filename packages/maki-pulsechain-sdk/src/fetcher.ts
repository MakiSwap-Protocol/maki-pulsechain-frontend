import { Contract } from '@ethersproject/contracts'
import { getNetwork } from '@ethersproject/networks'
import { getDefaultProvider } from '@ethersproject/providers'
import { TokenAmount } from './entities/fractions/tokenAmount'
import { Pair } from './entities/pair'
import IMakiswapPair from 'makiswap-core/build/IMakiswapPair.json'
import invariant from 'tiny-invariant'
import ERC20 from './abis/ERC20.json'
import { ChainId } from './constants'
import { Token } from './entities/token'

let TOKEN_DECIMALS_CACHE: { [chainId: number]: { [address: string]: number } } = {
  [ChainId.MAINNET]: {
    /* ADD TOKENS HERE */
    '0x10cf8b3d748a38f6f2063e8a30f44c9d674e4fe2': 18, // maki
    '0xdf08630d0ae0110754ca04694d2645c0f170e54b': 18, // soy
    '0xa1077a294dde1b09bb078844df40758a5d0f9a27': 18, // wpls
    '0x0cb6f5a34ad42ec934882a05265a7d5f59b51a2f': 6,  // usdt
    '0x15d38573d2feeb82e7ad5187ab8c1d52810b1f07': 6   // usdc
  }
}

/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */
export abstract class Fetcher {
  /**
   * Cannot be constructed.
   */
  private constructor() {}

  /**
   * Fetch information for a given token on the given chain, using the given provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol optional symbol of the token
   * @param name optional name of the token
   */
  public static async fetchTokenData(
    chainId: ChainId,
    address: string,
    provider = getDefaultProvider(getNetwork(chainId)),
    symbol?: string,
    name?: string
  ): Promise<Token> {
    const parsedDecimals =
      typeof TOKEN_DECIMALS_CACHE?.[chainId]?.[address] === 'number'
        ? TOKEN_DECIMALS_CACHE[chainId][address]
        : await new Contract(address, ERC20, provider).decimals().then((decimals: number): number => {
            TOKEN_DECIMALS_CACHE = {
              ...TOKEN_DECIMALS_CACHE,
              [chainId]: {
                ...TOKEN_DECIMALS_CACHE?.[chainId],
                [address]: decimals
              }
            }
            return decimals
          })
    return new Token(chainId, address, parsedDecimals, symbol, name)
  }

  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  public static async fetchPairData(
    tokenA: Token,
    tokenB: Token,
    provider = getDefaultProvider(getNetwork(tokenA.chainId))
  ): Promise<Pair> {
    invariant(tokenA.chainId === tokenB.chainId, 'CHAIN_ID')
    const address = Pair.getAddress(tokenA, tokenB)
    const [reserves0, reserves1] = await new Contract(address, IMakiswapPair.abi, provider).getReserves()
    const balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0]
    return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]))
  }
}
