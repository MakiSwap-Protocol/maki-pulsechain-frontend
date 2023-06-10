import { Currency } from 'maki-pulsechain-sdk'
import { Field } from 'state/swap/actions'

export enum OrderType {
  BUY = 0,
  SELL,
}
export type Currencies = {
  [field in Field]?: Currency
}
export type CurrenciesFromOrderType = {
  [OrderType.BUY]: Currencies
  [OrderType.SELL]: Currencies
}
