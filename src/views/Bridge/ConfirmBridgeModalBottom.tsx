import { Currency, CurrencyAmount, Fraction, Percent } from 'maki-pulsechain-sdk'
import React from 'react'
import { Button, Text } from 'maki-toolkit'
import { useTranslation } from 'contexts/Localization'
import { TranslateString } from 'utils/translateTextHelpers'
import { Field } from 'state/mint/actions'
import { RowBetween, RowFixed } from 'components/Row'
import CurrencyLogo from 'components/CurrencyLogo'

export function ConfirmBridgeModalBottom({
  currency,
  parsedAmount,
  onBridge
}: {
  currency: Currency
  parsedAmount: CurrencyAmount
  onBridge: () => void
}) {
  const { t } = useTranslation()
  return (
    <>
      <RowBetween>
        <Text>From {currency?.symbol} (Pls)</Text>
        <RowFixed>
          <CurrencyLogo currency={currency} style={{ marginRight: '8px' }} />
          <Text>{parsedAmount?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text>To {currency?.symbol} (Polygon)</Text>
        <RowFixed>
          <CurrencyLogo currency={currency} style={{ marginRight: '8px' }} />
          <Text>{parsedAmount?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>
      <Button mt="20px" onClick={onBridge}>
        {t('Bridge')}
      </Button>
    </>
  )
}

export default ConfirmBridgeModalBottom
