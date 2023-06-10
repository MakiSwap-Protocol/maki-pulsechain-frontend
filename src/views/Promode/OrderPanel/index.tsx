import React, { useState } from 'react'
import { Currency, CurrencyAmount, Trade } from 'maki-pulsechain-sdk';
import { useDerivedSwapInfo } from 'state/swap/hooks';
import { Field } from 'state/swap/actions';
import { OrderNav } from './orderNav'
import { SwapBoard } from './swapBoard'
import { LimitBoard } from './limitBoard'
import { InfoBoard } from './infoBoard';

type  OrderPanelProps = {
 buy: {
  currencies: { [field in Field]?: Currency },
  trade: Trade,
  inputError?: string,
 },
 sell: {
  currencies: { [field in Field]?: Currency },
  trade: Trade,
  inputError?: string,
 }
}
export default function({ buy, sell }: OrderPanelProps) {
  const[formIndex, setFormIndex] = useState<number>(0)
  
  return (
    <section style={{
      height: '100%',
      width: '100%'
    }}>
      <OrderNav
        activeIndex={formIndex}
        onChange={(index) => setFormIndex(index)}
      />
      {
        formIndex === 0 && (<SwapBoard buy={buy} sell={sell} />)
      }
      {
        formIndex === 1 && (<LimitBoard buy={buy} sell={sell} />)
      }
      {
        formIndex > 1 && (<InfoBoard  trade={sell.trade} currencies={sell.currencies}/>)
      }
    </section>
  )
}