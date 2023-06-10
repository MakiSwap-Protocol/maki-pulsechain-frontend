import React from 'react'
import { Text } from 'maki-toolkit'

import { EOrderType } from 'state/limit/enums'
import { BUY_COLOR, SELL_COLOR } from '../components'

export const TableText: React.FC<{ type: EOrderType }> = ({ children: value, type }) => {
  switch (type) {
    case EOrderType.BUY:
      return (
        <Text color={BUY_COLOR} small>
          {value}
        </Text>
      )
    case EOrderType.SELL:
      return (
        <Text color={SELL_COLOR} small>
          {value}
        </Text>
      )
    default:
      return (
        <Text color="textSubtle" small>
          {value}
        </Text>
      )
  }
}
