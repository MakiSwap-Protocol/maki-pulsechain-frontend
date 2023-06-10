import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Trade } from 'maki-pulsechain-sdk'
import { Heading } from 'maki-toolkit'

import { useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { Field } from 'state/swap/actions'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { useTokenBySymbolOrName } from 'hooks/Tokens'
import { isDefaultTokenOrCurrency } from 'utils/tokens'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import { useUserDeadline, useUserSlippageTolerance } from 'state/user/hooks'
import { useCreateLimitOrder, useLimitState } from 'state/limit/hooks'

import ProgressSteps from 'components/ProgressSteps'
import { useTranslation } from 'contexts/Localization'
import ConfirmSwapModal from 'components/Swap/ConfirmSwapModal'
import { computeTradePriceBreakdown } from 'utils/prices'
import useSwapCallback from 'hooks/useSwapCallback'
import confirmPriceImpactWithoutFee from 'components/Swap/confirmPriceImpactWithoutFee'
import { SELL_COLOR, BUY_COLOR } from '../components'
import { LimitOrderForm } from './limitOrderForm'
import SwapOrderForm from './swapOrderForm'
import { Currencies, OrderType } from './types'
import { ApprovalButton } from './approvalButton'
import { ActionButton } from './actionButton'

type OrderTypeComponentProps = {
  currencies: Currencies;
  trade: Trade;
  error?: string;
  formType: 'SWAP' | 'LIMIT',
  orderType: OrderType,
}

interface OrderTypeComponentState {
  isShowConfirmModal: boolean
  tradeToConfirm: Trade | undefined
  attemptingTxn: boolean
  txHash: string | undefined
  transactionError: string | undefined
}
export const OrderTypeComponent: React.FC<OrderTypeComponentProps> = ({ currencies, formType, orderType, trade, error }) => {
  const [{ isShowConfirmModal, tradeToConfirm, attemptingTxn, txHash }, setOrderTypeState] = useState<OrderTypeComponentState>({
    isShowConfirmModal: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    txHash: undefined,
    transactionError: undefined
  })

  const { t } = useTranslation()
  const { typedValue, recipient } = useSwapState()
  const [allowedSlippage] = useUserSlippageTolerance()
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage, formType === 'SWAP')
  const { onUserInput, onUserInput2 } = useSwapActionHandlers()
  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)
  const [deadline] = useUserDeadline()

  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    deadline,
    recipient,
  )

  const inputCurrency = currencies[Field.INPUT]
  const outputCurrency = currencies[Field.OUTPUT]

  const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(inputCurrency, outputCurrency, typedValue)
  const { status: limitStatus, error: limitError } = useLimitState()

  const showApproveFlow = !error && approval !== ApprovalState.APPROVED && !isDefaultTokenOrCurrency(inputCurrency)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE

  const [token0, token1] = [
    useTokenBySymbolOrName(inputCurrency?.symbol)?.[0],
    useTokenBySymbolOrName(outputCurrency?.symbol)?.[0],
  ]
  const { limitOrderTransaction, useCreateOrder } = useCreateLimitOrder(token0, token1, trade)

  useEffect(() => {
    if(limitOrderTransaction != null && limitStatus === 'succeeded'){
      setOrderTypeState((prevState) => ({ 
        ...prevState, 
        txHash: limitOrderTransaction?.transactionReceipt?.transactionHash,
        attemptingTxn: false
      }))
    }
    if(limitStatus === 'loading'){
      setOrderTypeState((prevState) => ({ 
        ...prevState, attemptingTxn: true
      }))
    }
  }, [limitOrderTransaction, limitStatus])

  const action = useMemo(() => {
    // (limitStatus === 'idle' || limitStatus === 'succeeded') &&
    let _action;
    const _enable = [currencies[Field.INPUT], currencies[Field.OUTPUT]]
      .map((currency) => { return currency?.name && currency.symbol && currency.decimals })
      .reduce((ac, cu) => Boolean(ac && cu), true) && formType === 'LIMIT' ?  limitStatus !== 'loading' && limitStatus !== 'idle'&& !limitError
      : !swapCallbackError;

    if(_enable && showWrap){
      _action =  onWrap
    } else if(_enable){
      _action = () => (    
        setOrderTypeState((prevState) => ({
          ...prevState,
        tradeToConfirm: trade,
        // attemptingTxn: false,
        transactionError: undefined,
        isShowConfirmModal: true,
        txHash: undefined,
      })))
    }
    return _action;
  }, [swapCallbackError, currencies, formType, limitStatus, limitError, showWrap, onWrap, trade])

  const useLimitAction = () => useCreateOrder()
 
  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setOrderTypeState((prevState) => ({ ...prevState, attemptingTxn: true, swapErrorMessage: undefined, txHash: undefined }))
    swapCallback()
      .then((hash) => {
        setOrderTypeState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          transactionError: undefined,
          txHash: hash,
        }))
      })
      .catch((e: any) => {
        setOrderTypeState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          transactionError: e.message,
          txHash: undefined,
        }))
      })
  }, [priceImpactWithoutFee, swapCallback, setOrderTypeState])

  const handleAcceptChanges = useCallback(() => {
    setOrderTypeState((prevState) => ({ ...prevState, tradeToConfirm: trade }))
  }, [trade])

    const handleConfirmDismiss = useCallback(() => {
    setOrderTypeState((prevState) => ({ ...prevState, isShowConfirmModal: false }))

    // if there was a tx hash, we want to clear the input
    if (txHash && orderType === OrderType.SELL) {
      onUserInput(Field.INPUT, '')
    }
    else if(txHash && orderType === OrderType.BUY){
      onUserInput2(Field.INPUT, '')
    }
  }, [onUserInput, onUserInput2 ,txHash, setOrderTypeState, orderType])

  const title = orderType === OrderType.BUY ? 'Buy' : 'Sell'

  const header = useMemo(() => (
    <Heading
      style={{
        textAlign: 'center',
        color: orderType === OrderType.BUY ? BUY_COLOR : SELL_COLOR,
      }}
    >
      {`${t(title)} ${(orderType === OrderType.SELL ? inputCurrency : outputCurrency).symbol}`}
    </Heading>
  ), [orderType, t, title, inputCurrency, outputCurrency])
  return (
    <>
      {
        formType === 'SWAP'? (
          <SwapOrderForm
            currencies={currencies}
            trade={trade}
            formType={formType}
            orderType={orderType}
            header={header}
            buttonAction={
              showApproveFlow && inputCurrency ? (
                <ApprovalButton approvalState={approval} onClick={approveCallback} currentyInput={inputCurrency} />
              ) : (
                <ActionButton
                  currencies={currencies}
                  trade={trade}
                  inputError={wrapInputError ?? error ?? swapCallbackError}
                  type={orderType}
                  wrapType={wrapType}
                  disabled={!!wrapInputError || !!error}
                  action={action}
                />
              )
            }
          />
        ) : (
          <LimitOrderForm
            currencies={currencies}
            trade={trade}
            formType={formType}
            orderType={orderType}
            header={header}
            buttonAction={
              showApproveFlow && inputCurrency ? (
                <ApprovalButton approvalState={approval} onClick={approveCallback} currentyInput={inputCurrency} />
              ) : (
                <ActionButton
                  currencies={currencies}
                  trade={trade}
                  inputError={wrapInputError ?? error ?? swapCallbackError}
                  type={orderType}
                  wrapType={wrapType}
                  disabled={!!wrapInputError || !!error}
                  action={action}
                />
              )
            }
          />
        ) 
      }

      { 
        showApproveFlow && <ProgressSteps steps={[
          approval !== ApprovalState.NOT_APPROVED && 
          approval !== ApprovalState.PENDING && 
          approval !== ApprovalState.UNKNOWN
          ]}/>
      }
      {/* {swapCallbackError ? <SwapCallbackError error={swapCallbackError} /> : null} */}
      <ConfirmSwapModal
        title={formType === 'SWAP' ? 'Confirm Swap' : 'Confirm Order'}
        isSwap={formType === 'SWAP'}
        isOpen={isShowConfirmModal}
        trade={trade}
        originalTrade={tradeToConfirm}
        onAcceptChanges={handleAcceptChanges}
        attemptingTxn={attemptingTxn}
        txHash={txHash}
        recipient={recipient}
        allowedSlippage={allowedSlippage}
        onConfirm={formType  === 'SWAP' ? handleSwap : useCreateOrder}
        swapErrorMessage={wrapInputError ?? error ?? swapCallbackError}
        onDismiss={handleConfirmDismiss}
      />
    </>
  )
}
