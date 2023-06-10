import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO, USD_PLS_POOL_PID } from 'config'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import { Farm } from 'state/types'

const getFarmFromTokenSymbol = (farms: Farm[], tokenSymbol: string, preferredQuoteTokens?: string[]): Farm => {
  const farmsWithTokenSymbol = farms.filter((farm) => farm.token.symbol === tokenSymbol)
  const filteredFarm = filterFarmsByQuoteToken(farmsWithTokenSymbol, preferredQuoteTokens)
  return filteredFarm
}

const getFarmBaseTokenPrice = (farm: Farm, quoteTokenFarm: Farm, htPriceHusd: BigNumber): BigNumber => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote)
  if (farm.quoteToken.symbol === 'FUSD' || farm.quoteToken.symbol === 'USDC') {
    return hasTokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (farm.quoteToken.symbol === 'PLS') {
    return hasTokenPriceVsQuote ? htPriceHusd.times(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  // We can only calculate profits without a quoteTokenFarm for FUSD/PLS farms
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  // Possible alternative farm quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the farm's quote token isn't FUSD or WPLS, we then use the quote token, of the original farm's quote token
  // i.e. for farm PNT - pBTC we use the pBTC farm's quote token - PLS, (pBTC - PLS)
  // from the PLS - pBTC price, we can calculate the PNT - FUSD price
  if (quoteTokenFarm.quoteToken.symbol === 'PLS') {
    const quoteTokenInHusd = htPriceHusd.times(quoteTokenFarm.tokenPriceVsQuote)
    return hasTokenPriceVsQuote && quoteTokenInHusd
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInHusd)
      : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'FUSD' || quoteTokenFarm.quoteToken.symbol === 'USDC') {
    const quoteTokenInHusd = quoteTokenFarm.tokenPriceVsQuote

    return hasTokenPriceVsQuote && quoteTokenInHusd
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInHusd)
      : BIG_ZERO
  }

  // Catch in case token does not have immediate or once-removed FUSD/WPLS quoteToken
  return BIG_ZERO
}

const getFarmQuoteTokenPrice = (farm: Farm, quoteTokenFarm: Farm, htPriceHusd: BigNumber): BigNumber => {
  if (farm.quoteToken.symbol === 'FUSD' || farm.quoteToken.symbol === 'USDC') {
    return BIG_ONE
  }

  if (farm.quoteToken.symbol === 'PLS') {
    return htPriceHusd
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'PLS') {
    return quoteTokenFarm.tokenPriceVsQuote ? htPriceHusd.times(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'FUSD' || quoteTokenFarm.quoteToken.symbol === 'USDC') {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  return BIG_ZERO
}

const fetchFarmsPrices = async (farms) => {
  const htHusdFarm = farms.find((farm: Farm) => farm.pid === USD_PLS_POOL_PID)
  const htPriceHusd = htHusdFarm.tokenPriceVsQuote ? BIG_ONE.div(htHusdFarm.tokenPriceVsQuote) : BIG_ZERO

  const farmsWithPrices = farms.map((farm) => {
    const quoteTokenFarm = getFarmFromTokenSymbol(farms, farm.quoteToken.symbol)
    const baseTokenPrice = getFarmBaseTokenPrice(farm, quoteTokenFarm, htPriceHusd)
    const quoteTokenPrice = getFarmQuoteTokenPrice(farm, quoteTokenFarm, htPriceHusd)

    // console.log(`quoteTokenFarm ${quoteTokenFarm?.pid} - ${quoteTokenFarm?.lpSymbol}`,`baseTokenPrice: ${baseTokenPrice?.toString()}`,`quoteTokenPrice ${quoteTokenPrice?.toString()}`);

    const token = { ...farm.token, husdPrice: baseTokenPrice.toJSON() }
    const quoteToken = { ...farm.quoteToken, husdPrice: quoteTokenPrice.toJSON() }
    return { ...farm, token, quoteToken }
  })
  // console.log('--------------------');
  return farmsWithPrices
}

export default fetchFarmsPrices
