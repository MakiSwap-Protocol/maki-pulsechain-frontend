import React, { FC, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Trade } from 'maki-pulsechain-sdk'
import { Flex } from 'maki-toolkit'
import CancelOrderModal from '../Dialogs'
import { Currencies, OrderType } from './types'
import { OrderTypeComponent } from './OrderTypeComponent'

type SwapBoardProps = {
  buy: {
    currencies: Currencies,
    trade: Trade,
    inputError?: string,
   },
   sell: {
    currencies: Currencies,
    trade: Trade,
    inputError?: string,
   }
}

export const SwapBoard: FC<SwapBoardProps> = ({buy, sell}) => {

  const [isShowCancelModal, showCancelModal] = useState<boolean>(false)
  
  // check whether the user has approved the router on the input token

  return (
    <Flex height="90%" padding={10} flexWrap='wrap'>
      <OrderTypeComponent
        formType='SWAP'
        trade={buy.trade}
        currencies={buy.currencies} 
        orderType={OrderType.BUY}
        error={buy.inputError}   
      />
      <OrderTypeComponent
      formType='SWAP'
      trade={sell.trade}
      currencies={sell.currencies} 
      orderType={OrderType.SELL}
      error={sell.inputError}   
      />
      <CancelOrderModal
        isOpen={isShowCancelModal}
        onConfirm={() => showCancelModal(false)}
        onDismiss={() => showCancelModal(false)}
      />
    </Flex>
  )
}

