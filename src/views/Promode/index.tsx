import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'
import TradingChart from 'components/TradingChart/TradingChart'
import { useActiveWeb3React } from 'hooks'
import { cancelOrder } from 'state/limit/'

import { useDerivedSwapInfo, useDerivedSwapInfo2, useSwapActionHandlers } from 'state/swap/hooks'
import { useAllTokens } from 'hooks/Tokens'
import { Field } from 'state/swap/actions'
import Loader from 'components/Loader'
import useWindowDimensions from 'hooks/useWindowDimensions'
import { useLimitState } from 'state/limit/hooks'
import { useDispatch } from 'react-redux'
import { remOrder, updateStatus } from 'state/limit/actions'
import RightPanel from './RightPanel'
import StatusBar from './StatusBar'
import OrderPanel from './OrderPanel'
import TrendingPairs from './TrendingPairs'
import TableOrders from './tables'
import {
  Container,
  CenterPanel,
  GridContainer,
  LeftSidePanel,
  OrderPainelContainer,
  SidePanel,
  StatusBarContent,
} from './components'
import CancelOrderModal from './Dialogs'

interface Dimensions {
  width: number
  height: number
}

export default function () {
  // const [chartDimensions, setCharDimensions] = useState<Dimensions>({
  //   width: 470,
  //   height: 230,
  // })
  const dispatch = useDispatch()
  const [isShowCancelModal, showCancelModal] = useState<boolean>(false)
  const { height, width } = useWindowDimensions()
  const { account, chainId, library } = useActiveWeb3React()
  
  // const centerPanelRef = useRef<HTMLDivElement>()

  const { status, feeStake, feeExecutor, gasPrice, selectedOrder, readContractAddress } = useLimitState()

  const defaultPairSymbol: string[] | undefined = process.env.REACT_APP_DEFAULT_PAIR?.split(',')
  const tokens = useAllTokens()

  const { currencies: currenciesBuy, v2Trade: tradeBuy, inputError: inputErrorBuy } = useDerivedSwapInfo2()
  const { currencies: currenciesSell, v2Trade: tradeSell, inputError: inputErrorSell } = useDerivedSwapInfo()

  const { onCurrencySelection } = useSwapActionHandlers()

  useEffect(() => {
    if (!currenciesSell[Field.INPUT]) {
      const token = Object.values(tokens).find(
        (_t) => _t?.symbol?.toUpperCase() === defaultPairSymbol?.[0]?.toUpperCase(),
      )
      onCurrencySelection(Field.INPUT, token)
    }
    if (!currenciesSell[Field.OUTPUT]) {
      const token = Object.values(tokens).find(
        (_t) => _t?.symbol?.toUpperCase() === defaultPairSymbol?.[1]?.toUpperCase(),
      )
      onCurrencySelection(Field.OUTPUT, token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <GridContainer>
        {/* <StatusBarContent>
          <StatusBar high={1.000055} low={0.999875} price={1.000055} volume={22182248} totalLiquidity={223930552} />
        </StatusBarContent> */}
        <LeftSidePanel>
          <TrendingPairs />
        </LeftSidePanel>

        <CenterPanel>
          {currenciesSell[Field.INPUT] && currenciesSell[Field.OUTPUT] ? (
            <TradingChart
              inputCurrency={currenciesSell[Field.INPUT]}
              outputCurrency={currenciesSell[Field.OUTPUT]}
              minWidth={0.344 * width}
              minHeight={0.35 * height}
              // backgroundColor={theme.isDark ? '#172339' : '#e6edf8'}
            />
          ) : (
            <Loader />
          )}
        </CenterPanel>
        <OrderPainelContainer>
          {currenciesSell[Field.INPUT] && currenciesSell[Field.OUTPUT] ? (
            <OrderPanel
              buy={{ currencies: currenciesBuy, trade: tradeBuy, inputError: inputErrorBuy }}
              sell={{ currencies: currenciesSell, trade: tradeSell, inputError: inputErrorSell }}
            />
          ) : (
            <Loader />
          )}
        </OrderPainelContainer>
        <SidePanel>
          <RightPanel />
        </SidePanel>
        <CancelOrderModal
          isOpen={isShowCancelModal}
          onConfirm={() => {
            if (selectedOrder && account && status !== 'idle') {
              dispatch(
                updateStatus({
                  status: 'loading',
                }),
              )
              cancelOrder(selectedOrder.id, account, gasPrice, readContractAddress, library!)
                .then(() => {
                  console.log('cancel order success!')
                  dispatch(remOrder(selectedOrder.id))
                })
                .catch((e) => {
                  console.error('cancel order error: ', e)
                })
                .finally(() => {
                  dispatch(
                    updateStatus({
                      status: 'succeeded',
                    }),
                  )
                })
            }
            showCancelModal(false)
          }}
          onDismiss={() => showCancelModal(false)}
        />
      </GridContainer>
      <TableOrders modalAction={() => showCancelModal(true)} />
    </Container>
  )
}
