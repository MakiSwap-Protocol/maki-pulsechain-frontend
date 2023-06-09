import { Trade, TradeType } from 'maki-pulsechain-sdk'
import React, { useMemo, useState } from 'react'

import { Text, Button } from 'maki-toolkit'
import { Repeat } from 'react-feather'

import { Field } from 'state/swap/actions'
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  formatExecutionPrice,
  warningSeverity,
} from 'utils/prices'
import { AutoColumn } from 'components/Column'
import QuestionHelper from 'components/QuestionHelper'
import { AutoRow, RowBetween, RowFixed } from 'components/Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import { StyledBalanceMaxMini, SwapCallbackError } from './styleds'

type SwapModalFooterProps = {
  trade: Trade
  isSwap?: boolean
  allowedSlippage: number
  onConfirm: () => void
  swapErrorMessage: string | undefined
  disabledConfirm: boolean
}
export default function SwapModalFooter({
  trade,
  isSwap = true,
  onConfirm,
  allowedSlippage,
  swapErrorMessage,
  disabledConfirm,
}: SwapModalFooterProps) {
  const [showInverted, setShowInverted] = useState<boolean>(false)
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [allowedSlippage, trade],
  )
  const { priceImpactWithoutFee, realizedLPFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const severity = warningSeverity(priceImpactWithoutFee)
  const [warningButtonText, buttonText] = isSwap ? ['Swap Anyway', 'Confirm Swap'] : ['Create Order Anyway', 'Create Order'];
  return (
    <>
      <AutoColumn gap="0px">
        <RowBetween align="center">
          <Text fontSize="14px">Price</Text>
          <Text
            fontSize="14px"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '8px',
              fontWeight: 500,
            }}
          >
            {formatExecutionPrice(isSwap, trade, showInverted)}
            <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
              <Repeat size={14} />
            </StyledBalanceMaxMini>
          </Text>
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <Text fontSize="14px">
              {trade.tradeType === TradeType.EXACT_INPUT ? 'Minimum received' : 'Maximum sold'}
            </Text>
            <QuestionHelper text="Your transaction will revert if there is a large, unfavorable price movement before it is confirmed." />
          </RowFixed>
          <RowFixed>
            <Text fontSize="14px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4) ?? '-'
                : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4) ?? '-'}
            </Text>
            <Text fontSize="14px" marginLeft="4px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? trade.outputAmount.currency.symbol
                : trade.inputAmount.currency.symbol}
            </Text>
          </RowFixed>
        </RowBetween>
        {
          isSwap && (
            <>
              <RowBetween>
                <RowFixed>
                  <Text fontSize="14px">Price Impact</Text>
                  <QuestionHelper text="The difference between the market price and your price due to trade size." />
                </RowFixed>
                <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <Text fontSize="14px">Liquidity Provider Fee</Text>
                  <QuestionHelper text="For each trade a 0.2% fee is paid. 0.17% goes to liquidity providers and 0.03% goes to the MakiSwap Team." />
                </RowFixed>
                <Text fontSize="14px">
                  {realizedLPFee ? `${realizedLPFee?.toSignificant(6)} ${trade.inputAmount.currency.symbol}` : '-'}
                </Text>
              </RowBetween>
            </>
          ) 
        }
      </AutoColumn>

      <AutoRow>
        <Button
          onClick={onConfirm}
          disabled={disabledConfirm}
          variant={severity > 2 ? 'danger' : 'primary'}
          mt="10px"
          id="confirm-swap-or-send"
          width="100%"
        >
          {severity > 2  ? warningButtonText : buttonText}
        </Button>

        {swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </AutoRow>
    </>
  )
}
