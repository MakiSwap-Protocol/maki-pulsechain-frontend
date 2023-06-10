import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Text } from 'maki-toolkit'
import { Currency,  Trade } from 'maki-pulsechain-sdk'
import PriceInput from 'components/PriceInput'
import { useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { Field } from 'state/swap/actions'
import { useTranslation } from 'contexts/Localization'
import CurrencyLogo from 'components/CurrencyLogo'
import { RowBetween } from 'components/Row'
import { Currencies, OrderType } from './types'
import { InputContainer, InputRow } from '../components'


type SwapOrderFormProps = {
  currencies: Currencies,
  trade: Trade,
  formType: 'SWAP' | 'LIMIT',
  orderType: OrderType,
  header: JSX.Element,
  buttonAction: JSX.Element
}

const SwapOrderForm: FC<SwapOrderFormProps> = ({ currencies, trade, formType, orderType, header, buttonAction }) => {
  const { t } = useTranslation()
  const { onUserInput, onUserInput2 } = useSwapActionHandlers()
  const { independentField, independentField2 } = useSwapState()

  const [price, setPrice] = useState<string>('0')
  const [fromAmount, setFromAmount] = useState<string>('0')
  const [toAmount, setToAmount] = useState<string>('0')


  const changeFrom = (val) => {
    setFromAmount(val)
    if (orderType === OrderType.SELL) {
      onUserInput(Field.INPUT, val)
    } else {
      onUserInput2(Field.INPUT, val)
    }
  }

  const changeTo = (val) => {
    setToAmount(val)
    if (orderType === OrderType.SELL) {
      onUserInput(Field.OUTPUT, val)
    } else {
      onUserInput2(Field.OUTPUT, val)
    }
  }

  useEffect(() => {
    if (trade && independentField) {
      setPrice(trade.executionPrice.toSignificant(8));

      if (independentField === Field.INPUT && orderType === OrderType.BUY) {
        setToAmount(trade.outputAmount.toSignificant(8))
      } else {
        setFromAmount(trade.inputAmount.toSignificant(8))  
      }

      if (independentField2 === Field.INPUT && orderType === OrderType.SELL) {
        setToAmount(trade.outputAmount.toSignificant(8))
      } else {
        setFromAmount(trade.inputAmount.toSignificant(8))  
      }

    }
  }, [trade, orderType, independentField, independentField2])

  return (
    <Container>
      <Wrapper>
        {header}
        <div
          style={{
            marginBottom: 10,
          }}
        >
          <Text color="textSubtle">{t('Price')}</Text>
          <InputContainer hideInput={false}>
            <InputRow selected={false}>
            <RowBetween>
              <Text id="input-price" color='textSubtle'>{price}</Text>
              
              <CurrencyLogo currency={currencies.OUTPUT} size="24px" style={{ marginRight: '8px' }} />
            </RowBetween>
            </InputRow>
          </InputContainer>
          {/* <Text color="textSubtle" small key="limit-on-usd">
            ~$1.0000055
          </Text> */}
        </div>
        <div
          style={{
            marginBottom: 10,
          }}
        >
          <Text color="textSubtle">{t('Amount')}</Text>
          <PriceInput value={fromAmount} id="input-amount" onChange={changeFrom} currency={currencies[Field.INPUT]} />
          {/* <CurrencyInputPanel
                label={independentField === Field.OUTPUT && trade ? 'From (estimated)' : 'From'}
                value={formattedAmounts[Field.INPUT]}
                showMaxButton={false}
                currency={currencies[Field.INPUT]}
                onUserInput={setFromAmount}
                onMax={() => null}
                // onCurrencySelect={handleInputSelect}
                // otherCurrency={currencies[Field.OUTPUT]}
                disableCurrencySelect
                id="swap-currency-input"
              /> */}
        </div>
        <div
          style={{
            marginBottom: 10,
          }}
        >
          <Text color="textSubtle">{t('Total')}</Text>
          <PriceInput value={toAmount} id="input-total" onChange={changeTo} currency={currencies[Field.OUTPUT]}/>
          {/* <CurrencyInputPanel
                value={formattedAmounts[Field.OUTPUT]}
                onUserInput={setToAmount}
                label={independentField === Field.INPUT &&  trade ? 'To (estimated)' : 'To'}
                showMaxButton={false}
                currency={currencies[Field.OUTPUT]}
                // onCurrencySelect={handleOutputSelect}
                // otherCurrency={currencies[Field.INPUT]}
                disableCurrencySelect
                id="swap-currency-output"
              /> */}
        </div>
        {/* <Text color="textSubtle" small key="total-on-usd">
          ~$0.00000
        </Text> */}
        { buttonAction }
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
export default React.memo(SwapOrderForm)