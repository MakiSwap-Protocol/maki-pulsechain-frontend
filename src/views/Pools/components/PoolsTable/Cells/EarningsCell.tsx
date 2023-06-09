import React from 'react'
import styled from 'styled-components'
import { Skeleton, Text, useTooltip, HelpIcon, Flex, Box, useModal, useMatchBreakpoints } from 'maki-toolkit'
import { Pool } from 'state/types'
import BigNumber from 'bignumber.js'
import { PoolCategory } from 'config/types'
import { BIG_ZERO } from 'config'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import Balance from 'components/Balance'
import { useMakiVault } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { getMakiVaultEarnings } from 'views/Pools/helpers'
import CollectModal from 'views/Pools/components/PoolCard/Modals/CollectModal'

import BaseCell, { CellContent } from './BaseCell'

interface EarningsCellProps {
  pool: Pool
  account: string
  userDataLoaded: boolean
}

const StyledCell = styled(BaseCell)`
  flex: 4.5;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 120px;
  }
`

const HelpIconWrapper = styled.div`
  align-self: center;
`

const EarningsCell: React.FC<EarningsCellProps> = ({ pool, account, userDataLoaded }) => {
  const { t } = useTranslation()
  const { isXs, isSm } = useMatchBreakpoints()
  const { sousId, earningToken, userData, earningTokenPrice, poolCategory, isAutoVault } = pool
  const isManualMakiPool = sousId === 0

  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  // These will be reassigned later if its Auto MAKI vault
  let earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  let earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)
  let hasEarnings = account && earnings.gt(0)
  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)
  const earningsDollarValue = formatNumber(earningTokenDollarBalance)
  const isPlsPool = poolCategory === PoolCategory.PLS

  // Auto MAKI vault calculations
  const {
    userData: { makiAtLastUserAction, userShares, lastUserActionTime },
    pricePerFullShare,
  } = useMakiVault()
  const { hasAutoEarnings, autoMakiToDisplay, autoUsdToDisplay } = getMakiVaultEarnings(
    account,
    makiAtLastUserAction,
    userShares,
    pricePerFullShare,
    earningTokenPrice,
  )
  // eslint-disable-next-line
  const lastActionInMs = lastUserActionTime && parseInt(lastUserActionTime) * 1000
  const dateTimeLastAction = new Date(lastActionInMs)
  const dateStringToDisplay = dateTimeLastAction.toLocaleString()

  const labelText = isAutoVault ? t('Recent MAKI profit') : t('%asset% Earned', { asset: earningToken.symbol })
  earningTokenBalance = isAutoVault ? autoMakiToDisplay : earningTokenBalance
  hasEarnings = isAutoVault ? hasAutoEarnings : hasEarnings
  earningTokenDollarBalance = isAutoVault ? autoUsdToDisplay : earningTokenDollarBalance

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Balance fontSize="16px" value={autoMakiToDisplay} decimals={3} bold unit=" MAKI" />
      <Balance fontSize="16px" value={autoUsdToDisplay} decimals={2} bold prefix="~$" />
      {t('Earned since your last action')}
      <Text>{dateStringToDisplay}</Text>
    </>,
    { placement: 'bottom' },
  )

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken}
      earningsDollarValue={earningsDollarValue}
      sousId={sousId}
      isPlsPool={isPlsPool}
      isCompoundPool={isManualMakiPool}
    />,
  )

  const handleEarningsClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onPresentCollect()
  }

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {labelText}
        </Text>
        {!userDataLoaded && account ? (
          <Skeleton width="80px" height="16px" />
        ) : (
          <>
            {tooltipVisible && tooltip}
            <Flex>
              <Box mr="8px" height="32px" onClick={!isAutoVault && hasEarnings ? handleEarningsClick : undefined}>
                <Balance
                  mt="4px"
                  bold={!isXs && !isSm}
                  fontSize={isXs || isSm ? '14px' : '16px'}
                  color={hasEarnings ? 'primary' : 'textDisabled'}
                  decimals={hasEarnings ? 5 : 1}
                  value={hasEarnings ? earningTokenBalance : 0}
                />
                {hasEarnings ? (
                  <Balance
                    display="inline"
                    fontSize="12px"
                    color={hasEarnings ? 'textSubtle' : 'textDisabled'}
                    decimals={2}
                    value={earningTokenDollarBalance}
                    unit=" USD"
                    prefix="~"
                  />
                ) : (
                  <Text mt="4px" fontSize="12px" color={hasEarnings ? 'textSubtle' : 'textDisabled'}>
                    0 USD
                  </Text>
                )}
              </Box>
              {isAutoVault && hasEarnings && !isXs && !isSm && (
                <HelpIconWrapper ref={targetRef}>
                  <HelpIcon color="textSubtle" />
                </HelpIconWrapper>
              )}
            </Flex>
          </>
        )}
      </CellContent>
    </StyledCell>
  )
}

export default EarningsCell
