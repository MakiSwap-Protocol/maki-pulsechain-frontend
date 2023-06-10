import { ChainId, Currency, CurrencyAmount, PLS, Token, TokenAmount, WPLS } from 'maki-pulsechain-sdk'

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  // eslint-disable-next-line no-nested-ternary
  return chainId && currency === PLS ? WPLS[chainId] : currency instanceof Token ? currency : undefined
}

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount | undefined,
  chainId: ChainId | undefined
): TokenAmount | undefined {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined
  return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined
}

export function unwrappedToken(token: Token): Currency {
  if (token.equals(WPLS[token.chainId])) return PLS
  return token
}
