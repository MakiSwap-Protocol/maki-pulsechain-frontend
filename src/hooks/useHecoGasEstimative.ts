import { ethers } from "ethers"
import { useCallback, useEffect, useState } from "react"
import web3NoAccount from 'utils/web3'
import useInterval from "./useInterval"

export interface HecoGasPrice {
  fast: number;
  median: number;
  low: number;
}

export interface HecoGas {
  readonly code: number;
  readonly prices: HecoGasPrice;
}

export function useHecoGasEstimative(interval: number): HecoGas | null {
  const [gas, setGas] = useState<HecoGas | null>(null)

    const fetchData = useCallback(async () => {
      try {
        const gasPrice = await web3NoAccount.eth.getGasPrice();
        const gasPriceGwei = Number(ethers.utils.formatUnits(gasPrice, 'gwei'));

        const res: HecoGas = {
          code: 0,
          prices: {
            low: Math.floor(gasPriceGwei * 1.15),
            median: Math.floor(gasPriceGwei * 1.25),
            fast: Math.floor(gasPriceGwei * 1.35),
          }
        }

        setGas(res)
      } catch (error) {
        console.error('Gas estimate failed, trying eth_call to extract error', error)
        throw new Error('Gas estimate failed, trying eth_call to extract error')
      }
    }, [setGas])

    useInterval(fetchData, interval)
  return gas
}