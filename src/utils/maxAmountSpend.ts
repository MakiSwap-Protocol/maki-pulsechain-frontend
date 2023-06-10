import { CurrencyAmount, PLS, JSBI } from 'maki-pulsechain-sdk'
import { MIN_PLS } from 'config'

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount): CurrencyAmount | undefined {
  if (!currencyAmount) return undefined
  if (currencyAmount.currency === PLS) {
    if (JSBI.greaterThan(currencyAmount.raw, MIN_PLS)) {
      return CurrencyAmount.pls(JSBI.subtract(currencyAmount.raw, MIN_PLS))
    }
    return CurrencyAmount.pls(JSBI.BigInt(0))
  }
  return currencyAmount
}

export default maxAmountSpend
