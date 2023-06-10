import { Currency, PLS, Token } from 'maki-pulsechain-sdk'

export function currencyId(currency: Currency): string {
  if (currency === PLS) return 'PLS'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
