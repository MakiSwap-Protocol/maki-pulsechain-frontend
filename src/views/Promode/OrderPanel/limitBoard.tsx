import React, { FC, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Currency, Trade } from 'maki-pulsechain-sdk'
import { Flex } from 'maki-toolkit'

import CancelOrderModal from '../Dialogs'
import { Currencies, OrderType } from './types'
import { OrderTypeComponent } from './OrderTypeComponent'

type LimitBoardProps = {
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

export const LimitBoard: FC<LimitBoardProps> = ({ buy, sell }) => {

  
  // check whether the user has approved the router on the input token

  return (
    <Flex height="90%" padding={10} flexWrap='wrap'>
      <OrderTypeComponent
      formType='LIMIT'
      currencies={buy.currencies} 
      orderType={OrderType.BUY}
      trade={buy.trade}
      error={buy.inputError}   
      />
      <OrderTypeComponent
      formType='LIMIT'
      currencies={sell.currencies} 
      orderType={OrderType.SELL}
      trade={sell.trade}
      error={sell.inputError}   
      />
    </Flex>
  )
}
