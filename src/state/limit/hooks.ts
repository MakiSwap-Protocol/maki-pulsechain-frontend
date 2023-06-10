import { useCallback, useEffect, useState } from 'react'
import { Trade, Token } from 'maki-pulsechain-sdk'
import { useSelector, useDispatch } from 'react-redux'
import { useActiveWeb3React } from 'hooks'
import { AppState } from 'state'
import { BigNumber } from 'ethers'

import { createOrder } from 'state/limit'
import { LimitOrderTransactionReceipt } from '@types'
import { IToken } from './types/token.interface'
import { IOrder } from './types/order.interface'
import { updateStatus } from './actions'

export function usePairOrders(): IOrder[] {
  const { pairOrders } = useSelector<AppState, AppState['limit']>((s) => s.limit)
  return pairOrders
}

export function useLimitState(): AppState['limit'] {
  return useSelector<AppState, AppState['limit']>((state) => state.limit)
}

export function useCreateLimitOrder(
  inputToken: IToken | Token, 
  outputToken: IToken | Token, 
  trade: Trade,
  createLimitOrderCallback?: (transactionReceipt?: LimitOrderTransactionReceipt) => void
) {
  const { account, library } = useActiveWeb3React()
  const { feeStake, feeExecutor, gasPrice, readContractAddress } = useLimitState()
  const [limitOrderTransaction, setLimitOrderTransaction] = useState<LimitOrderTransactionReceipt>()
  const [status, setStatus] = useState<'loading' | 'succeeded' | 'failed'>()
  const [error, setError] = useState<any>()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      updateStatus({
        status,
        error: error ? `deu erro no hook: ${error?.message}` : 'nao deu erro',
      }),
    )
  }, [status, error, dispatch])
  const useCreateOrder = useCallback(() => {
    setStatus('loading')
    return createOrder(
      account,
      inputToken,
      outputToken,
      Number(trade?.inputAmount?.toExact() ?? '0'),
      Number(trade?.outputAmount?.toExact() ?? '0'),
      gasPrice,
      BigNumber.from(feeStake),
      BigNumber.from(feeExecutor),
      readContractAddress,
      library!,
    )
      .then((transactionReceipt) => {
        // console.log('transaction', transactionReceipt)
        setLimitOrderTransaction(transactionReceipt)
        setStatus('succeeded')
        setError(undefined)
        createLimitOrderCallback?.(transactionReceipt)
        return transactionReceipt;
      })
      .catch((e) => {
        console.error('useCreateOrder error: ', e)
        setStatus('failed')
        setError(e)
        createLimitOrderCallback?.()
        return undefined
      })
  }, [account, createLimitOrderCallback, feeExecutor, feeStake, gasPrice, inputToken, library, outputToken, readContractAddress, trade?.inputAmount, trade?.outputAmount])
  return {
    limitOrderTransaction,
    status,
    error,
    useCreateOrder,
  }
}
