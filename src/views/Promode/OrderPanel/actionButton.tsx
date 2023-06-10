import React from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from 'hooks'
import { JSBI, Trade } from 'maki-pulsechain-sdk'
import { Button } from 'maki-toolkit'

import ConnectWalletButton from 'components/ConnectWalletButton'
import { GreyCard } from 'components/Card'
import { WrapType } from 'hooks/useWrapCallback'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { SELL_COLOR, BUY_COLOR } from '../components'
import { Currencies, OrderType } from './types'

interface ActionButtonProps {
  currencies: Currencies;
  trade: Trade;
  inputError?: string;
  type: OrderType;
  wrapType: WrapType;
  action?: () => void | Promise<void>
  disabled?: boolean;
  text?: string;
}

const BuyButton = styled(Button)`
  background-color: ${BUY_COLOR};
`

const SellButton = styled(Button)`
  background-color: ${SELL_COLOR};
`

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  text, type, action, wrapType, disabled, currencies, trade, inputError 
}) => {
  const { account } = useActiveWeb3React()

  const insufficientCase =
    (type === OrderType.SELL
      ? trade?.inputAmount?.greaterThan(JSBI.BigInt(0))
      : trade?.outputAmount?.greaterThan(JSBI.BigInt(0))) &&
    !trade?.route &&
    !!currencies.OUTPUT &&
    !!currencies.INPUT
  if (!account) {
    return <ConnectWalletButton width="100%" />
  }
  const _disabled = !account || !!inputError || disabled || !action
  if (wrapType !== WrapType.NOT_APPLICABLE) {
    return (
      <Button disabled={_disabled} onClick={action} width="100%">
        {text ?? (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
      </Button>
    )
  }
  if (insufficientCase) {
    return <GreyCard textAlign="center">Insufficient liquidity for this trade.</GreyCard>
  }
  const buttonText = inputError;
  return type === OrderType.BUY ? (
    <BuyButton scale="sm" width="100%" onClick={action} disabled={_disabled}>
      {text ?? buttonText ?? 'Buy'}
    </BuyButton>
  ) : (
    <SellButton scale="sm" width="100%" disabled={_disabled} onClick={action}>
      {text ?? buttonText ?? 'Sell'}
    </SellButton>
  )
}
