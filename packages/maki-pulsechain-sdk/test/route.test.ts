import { Token, WPLS, ChainId, Pair, TokenAmount, Route, PLS } from '../src'

describe('Route', () => {
  const token0 = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000001', 18, 't0')
  const token1 = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000002', 18, 't1')
  const wht = WPLS[ChainId.MAINNET]
  const pair_0_1 = new Pair(new TokenAmount(token0, '100'), new TokenAmount(token1, '200'))
  const pair_0_wht = new Pair(new TokenAmount(token0, '100'), new TokenAmount(wht, '100'))
  const pair_1_wht = new Pair(new TokenAmount(token1, '175'), new TokenAmount(wht, '100'))

  it('constructs a path from the tokens', () => {
    const route = new Route([pair_0_1], token0)
    expect(route.pairs).toEqual([pair_0_1])
    expect(route.path).toEqual([token0, token1])
    expect(route.input).toEqual(token0)
    expect(route.output).toEqual(token1)
    expect(route.chainId).toEqual(ChainId.MAINNET)
  })

  it('can have a token as both input and output', () => {
    const route = new Route([pair_0_wht, pair_0_1, pair_1_wht], wht)
    expect(route.pairs).toEqual([pair_0_wht, pair_0_1, pair_1_wht])
    expect(route.input).toEqual(wht)
    expect(route.output).toEqual(wht)
  })

  it('supports pls input', () => {
    const route = new Route([pair_0_wht], PLS)
    expect(route.pairs).toEqual([pair_0_wht])
    expect(route.input).toEqual(PLS)
    expect(route.output).toEqual(token0)
  })

  it('supports pls output', () => {
    const route = new Route([pair_0_wht], token0, PLS)
    expect(route.pairs).toEqual([pair_0_wht])
    expect(route.input).toEqual(token0)
    expect(route.output).toEqual(PLS)
  })
})
