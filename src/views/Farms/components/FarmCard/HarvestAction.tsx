import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from 'maki-toolkit'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'config'
import { useWeb3React } from '@web3-react/core'
import { usePriceMakiUsd } from 'state/hooks'
import Balance from 'components/Balance'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const makiPrice = usePriceMakiUsd()
  const dispatch = useAppDispatch()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
  const earningsHusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(makiPrice).toNumber() : 0

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column" alignItems="flex-start">
        <Heading color={rawEarningsBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
        {earningsHusd > 0 && (
          <Balance fontSize="12px" color="textSubtle" decimals={2} value={earningsHusd} unit=" USD" prefix="~" />
        )}
      </Flex>
      <Button
        disabled={rawEarningsBalance.eq(0) || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))

          setPendingTx(false)
        }}
      >
        {t('Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
