import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Trade } from 'maki-pulsechain-sdk'
import { Text } from 'maki-toolkit'
import PriceInput from 'components/PriceInput'
import IsNumber from 'is-number'
import { useSwapActionHandlers } from 'state/swap/hooks'
import { Field } from 'state/swap/actions'
import { Currencies, OrderType } from './types'

type LimitOrderFormProps = {
  currencies: Currencies
  trade: Trade;
  buttonAction: JSX.Element
  header: JSX.Element;
  orderType: OrderType;
  formType: 'SWAP' | 'LIMIT';
}

export const LimitOrderForm: FC<LimitOrderFormProps> = ({ 
  currencies, buttonAction, header, trade, orderType, formType 
}) => {
  const loaded = useRef<boolean>(false);
  const loaded2 = useRef<boolean>(false);

  const [price, setPrice] = useState<string>(trade?.executionPrice.toSignificant(8) ?? '0')
  const [amount, setAmount] = useState<string>(trade?.inputAmount.toSignificant(8) ?? '0')
  const [total, setTotal] = useState<string>(trade?.outputAmount.toSignificant(8) ?? '0')
  

  const { onUserInput, onUserInput2 } = useSwapActionHandlers()
  
  const updateTrade = (val) => {
    if(orderType === OrderType.SELL){
      onUserInput(Field.INPUT, val)
    } else {
      onUserInput2(Field.INPUT, val);
    }
  }

  useEffect(() => {
    if (orderType !== undefined && !loaded.current ) {
      loaded.current = true;
      if(orderType === OrderType.SELL){
        onUserInput(Field.INPUT, '1')
      } else {
        onUserInput2(Field.INPUT, '0.09');
      }
    }
  }, [orderType, onUserInput, onUserInput2]);

  useEffect(() => {
    if (trade && !loaded2.current) {
      loaded2.current = true;
      setPrice(trade.executionPrice.toSignificant(8));
    }
  }, [trade]);

  
  
  const onChangePrice = (val) => {
    setPrice(val)
    const _total = (Number(val) * Number(price)).toString()
    setTotal(_total);
    // updateTrade(_total);
  }

  const onChangeAmount = (val) => {
    setAmount(val)
    setTotal((Number(val) * Number(price)).toString());
    updateTrade(val);
  }

  const onChangeTotal = (val) => {
    setTotal(val)
    let _amount = '0.0';
    if (Number(amount) > 0) {
      _amount = (Number(val) / Number(price)).toString()
    }
    setAmount(_amount);
    updateTrade(_amount);
  }

  return (
    <Container>
      <Wrapper>
        {header}
        <div
          style={{
            marginBottom: 10,
          }}
        >
          <Text color="textSubtle">Limit Price</Text>
          <PriceInput value={price} id="input-price" onChange={onChangePrice} currency={currencies[Field.OUTPUT]}/>
          {/* <Text color="textSubtle" small key="limit-on-usd">
            ~$1.0000055
          </Text> */}
        </div>
        <div
          style={{
            marginBottom: 10,
          }}
        >
          <Text color="textSubtle">Amount </Text>
          <PriceInput value={amount} id="input-amount" onChange={onChangeAmount} currency={currencies[Field.INPUT]}/>
        </div>
        <div
          style={{
            marginBottom: 10,
          }}
        >
          <Text color="textSubtle">Total</Text>
          <PriceInput value={total} id="input-total" onChange={onChangeTotal} currency={currencies[Field.OUTPUT]}/>
        </div>
        {/* onChange={totalChange} <Text color="textSubtle" small key="total-on-usd">
          ~$0.00000
        </Text> */}
        {buttonAction}
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 10px;
  margin-inline: 5px;
  flex: 1;
`

const Wrapper = styled.div`
  flex: 1;
  padding: 10px;
`
