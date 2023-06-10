import React, { FC, useState, useCallback, useEffect } from 'react'
import { Currency, Trade } from 'maki-pulsechain-sdk'
import { Flex, Box, Text, Link } from 'maki-toolkit'
import { getScanUrlWithAddr } from 'utils/configHelpers'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { Field } from 'state/swap/actions'
import { Currencies } from './types'


type InfoBoardProps = {
  currencies: Currencies;
  trade: Trade;
}

export const InfoBoard: FC<InfoBoardProps> = ({ currencies, trade }) => {

  return (
    <>
      { 
      currencies && <Flex height='100%' padding='2rem'>
      <Box>
        <Text>Pair Name</Text>
        <Text>Pair Address</Text>
        <Text>${currencies[Field.INPUT].symbol} Address</Text>
        <Text>${currencies[Field.OUTPUT].symbol} Address</Text>
      </Box>
      <Box>
        <Text>{ currencies[Field.INPUT].symbol } / { currencies[Field.OUTPUT].symbol }</Text>
        <Link href={getScanUrlWithAddr('0x', 'address')} target="_blank">0x</Link>
        <Link href={getScanUrlWithAddr('0x', 'address')} target="_blank">0x</Link>
        <Link href={getScanUrlWithAddr('0x', 'address')} target="_blank">0x</Link>
      </Box>
      </Flex> 
     }
    </>
  )
}